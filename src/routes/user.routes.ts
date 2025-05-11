import express, { type Router } from "express";

const router: Router = express();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/users", (req, res) => {
  res.json([{ id: 1, name: "Phong" }]);
});

export default router;
