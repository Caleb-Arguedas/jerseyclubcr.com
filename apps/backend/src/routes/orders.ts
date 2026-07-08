import { Router, Request, Response } from 'express';
import pool from '../config/database';
import { CreateOrderDTO } from '../types';
import { verifyToken } from '../middleware/auth';

const router = Router();

// POST Crear orden
router.post('/', async (req: Request, res: Response) => {
  try {
    const { items, paymentMethod, customerName, customerEmail, customerPhone }: CreateOrderDTO = req.body;
    
    // Calcular total
    let total = 0;
    for (const item of items) {
      const product = await pool.query('SELECT price FROM products WHERE id = $1', [item.productId]);
      if (product.rows.length > 0) {
        total += product.rows[0].price * item.quantity;
      }
    }
    
    const result = await pool.query(
      `INSERT INTO orders (items, total, payment_method, customer_name, customer_email, customer_phone, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'pending')
       RETURNING *`,
      [JSON.stringify(items), total, paymentMethod, customerName, customerEmail, customerPhone]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear orden' });
  }
});

// GET Orden por ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener orden' });
  }
});

export default router;
