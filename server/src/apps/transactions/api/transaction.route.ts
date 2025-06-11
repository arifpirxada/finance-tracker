import { Router } from 'express';
import auth from 'middlewares/auth.middleware';
import {
  addTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from './transaction.controller';

const router = Router();

router.use(auth);

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [income, expense, transfer]
 *         description: Filter by transaction type
 *       - in: query
 *         name: account
 *         schema:
 *           type: string
 *         description: Filter by account ID
 *       - in: query
 *         name: toAccount
 *         schema:
 *           type: string
 *         description: Filter by target account ID
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         description: End date
 *       - in: query
 *         name: amountFrom
 *         schema:
 *           type: number
 *         description: Minimum amount
 *       - in: query
 *         name: amountTo
 *         schema:
 *           type: number
 *         description: Maximum amount
 *       - in: query
 *         name: tags
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: Tags to filter by
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in note field
 *       - in: query
 *         name: skip
 *         schema:
 *           type: number
 *         description: Number of items to skip
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Max number of items to return
 *     responses:
 *       200:
 *         description: List of transactions, note totalCount will only be returned when skip = 0
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Transactions fetched successfully" }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "684713d85ee479bcb4afef09"
 *                       userId:
 *                         type: string
 *                         example: "68457d3969cd17204b5700cp"
 *                       amount:
 *                         type: number
 *                         example: 31
 *                       note:
 *                         type: string
 *                         example: "Bought food"
 *                       account:
 *                         type: string
 *                         example: "6846975fad02004baa0c427l"
 *                       type:
 *                         type: string
 *                         enum: [income, expense, transfer]
 *                         example: "expense"
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["food", "grosary"]
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-06-09T17:43:00.000Z"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     skip:
 *                       type: number
 *                       example: 0
 *                     limit:
 *                       type: number
 *                       example: 20
 *                     count:
 *                       type: number
 *                       example: 12
 *                     totalCount:
 *                       type: number
 *                       example: 20
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */
router.get('/', getTransactions);

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Add a new transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Note toAccount only required when type = transfer
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - amount
 *               - account
 *               - date
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [income, expense, transfer]
 *               amount:
 *                 type: number
 *                 example: 30
 *               note:
 *                 type: string
 *                 example: 'Sold keyboard'
 *               account:
 *                 type: string
 *                 example: '6846975fad02004baa0c527b'
 *                 description: Required for all transactions. For type "transfer", this is the source account.
 *               toAccount:
 *                 type: string
 *                 example: '6846975fad02004baa0c528c'
 *                 description: Required only when type is "transfer". This is the target account.
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: ['sold']
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Transaction added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Transaction added" }
 *                 transactionId: { type: string, example: 6846976gad02004baa0c528c }
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: false }
 *                 message: { type: string, example: "Account balance cannot go negative" }
 *       422:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */
router.post('/', addTransaction);

/**
 * @swagger
 * /api/transactions:
 *   put:
 *     summary: Update an existing transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: note you can send all or few of the below fields. But if you change type to transfer, then toAccount is required.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - transactionId
 *             properties:
 *               transactionId:
 *                 type: string
 *                 example: 6846976gad02004baa0c528c
 *               amount:
 *                 type: number
 *                 example: 50
 *               note:
 *                 type: string
 *                 example: Bought food
 *               account:
 *                 type: string
 *                 example: 683276gad02004baa0c52adf
 *               toAccount:
 *                 type: string
 *                 example: 68469f9igad02004baa0c52aj
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: 50
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Transaction updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Transaction updated" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "684713d85ee479bcb4afef09"
 *                     userId:
 *                       type: string
 *                       example: "68457d3969cd17204b5700cp"
 *                     amount:
 *                       type: number
 *                       example: 31
 *                     note:
 *                       type: string
 *                       example: "Bought food"
 *                     account:
 *                       type: string
 *                       example: "6846975fad02004baa0c427l"
 *                     type:
 *                       type: string
 *                       enum: [income, expense, transfer]
 *                       example: "expense"
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["food", "grosary"]
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-06-09T17:43:00.000Z"
 *       404:
 *         description: Transaction not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: false }
 *                 message: { type: string, example: "Transaction not found while updating" }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */
router.put('/', updateTransaction);

/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Delete a transaction by ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID to delete
 *     responses:
 *       200:
 *         description: Transaction deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Transaction deleted" }
 *       404:
 *         description: Transaction not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: false }
 *                 message: { type: string, example: "Invalid or missing transaction ID" }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */
router.delete('/:id', deleteTransaction);

export default router;