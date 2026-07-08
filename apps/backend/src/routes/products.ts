import { Router, Request, Response } from 'express';
import pool from '../config/database';
import { CreateProductDTO, UpdateProductDTO } from '../types';
import { verifyToken, verifyAdmin } from '../middleware/auth';

const router = Router();

// GET todos los productos
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// GET producto por ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});

// POST Crear producto (Admin)
router.post('/', verifyToken, verifyAdmin, async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, team, league, country, player, type, sizes, stock, images }: CreateProductDTO = req.body;
    
    const result = await pool.query(
      `INSERT INTO products (name, description, price, category, team, league, country, player, type, sizes, stock, images)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [name, description, price, category, team, league, country, player, type, sizes, stock, images]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

// PUT Actualizar producto (Admin)
router.put('/:id', verifyToken, verifyAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates: UpdateProductDTO = req.body;
    
    const fields = [];
    const values = [];
    let paramCount = 1;
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    });
    
    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);
    
    const query = `UPDATE products SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`;
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

// DELETE Producto (Admin)
router.delete('/:id', verifyToken, verifyAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

// GET Búsqueda inteligente
router.get('/search/query', async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    const searchTerm = `%${q}%`;
    
    const result = await pool.query(
      `SELECT * FROM products WHERE 
       name ILIKE $1 OR 
       description ILIKE $1 OR 
       team ILIKE $1 OR 
       league ILIKE $1 OR 
       country ILIKE $1 OR 
       player ILIKE $1`,
      [searchTerm]
    );
    
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error en búsqueda' });
  }
});

export default router;
