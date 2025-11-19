import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';

// Import our modules (to be implemented)
import { config } from './config';
import { logger } from './utils/logger';
import { ollamaClient } from './ollama/universalClient';
import { authRoutes } from './routes/auth';
import { voiceRoutes } from './routes/voice';
import { fileRoutes } from './routes/files';

// Load environment variables
dotenv.config();

class AlMusaedServer {
  private app: express.Application;
  private server: any;
  private io: SocketIOServer;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new SocketIOServer(this.server, {
      cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST"]
      }
    });

    this.setupMiddleware();
    this.setupRoutes();
    this.setupWebSocket();
  }

  private setupMiddleware() {
    // Security
    this.app.use(helmet());
    
    // CORS
    this.app.use(cors({
      origin: true,
      credentials: true
    }));

    // Body parsing
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '50mb' }));

    // Static files
    this.app.use(express.static(path.join(__dirname, '../web')));
    
    // Logging
    this.app.use((req, res, next) => {
      logger.info(`${req.method} ${req.path}`, {
        ip: req.ip,
        userAgent: req.get('User-Agent')
      });
      next();
    });
  }

  private setupRoutes() {
    // Health check
    this.app.get('/api/health', (req, res) => {
      res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '1.0.0'
      });
    });

    // API routes
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/voice', voiceRoutes);
    this.app.use('/api/files', fileRoutes);
    this.app.use('/api/models', this.createModelRoutes());

    // Serve frontend
    this.app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../web/index.html'));
    });
  }

  private createModelRoutes() {
    const router = express.Router();

    router.get('/available', async (req, res) => {
      try {
        const models = await ollamaClient.listModels();
        res.json({ models });
      } catch (error) {
        logger.error('Failed to list models:', error);
        res.status(500).json({ error: 'Failed to list models' });
      }
    });

    router.get('/test/:model', async (req, res) => {
      try {
        const { model } = req.params;
        const capabilities = await ollamaClient.analyzeModel(model);
        res.json({ model, capabilities });
      } catch (error) {
        logger.error(`Failed to analyze model ${req.params.model}:`, error);
        res.status(500).json({ error: 'Failed to analyze model' });
      }
    });

    return router;
  }

  private setupWebSocket() {
    this.io.on('connection', (socket) => {
      logger.info(`Client connected: ${socket.id}`);

      // Voice data handling
      socket.on('voice-data', async (data) => {
        try {
          // Process voice data - to be implemented
          const result = await this.processVoiceData(data);
          socket.emit('voice-result', result);
        } catch (error) {
          logger.error('Voice processing error:', error);
          socket.emit('error', { message: 'Voice processing failed' });
        }
      });

      // Disconnection
      socket.on('disconnect', () => {
        logger.info(`Client disconnected: ${socket.id}`);
      });
    });
  }

  private async processVoiceData(data: any): Promise<any> {
    // Voice processing implementation - to be implemented
    return {
      text: 'Voice processing not yet implemented',
      confidence: 0
    };
  }

  public start(port: number = 3000) {
    this.server.listen(port, () => {
      logger.info(`🚀 المساعد الذكي server started on port ${port}`);
      logger.info(`📱 Web interface: http://localhost:${port}`);
      logger.info(`🔗 API documentation: http://localhost:${port}/api/health`);
    });
  }
}

// Start the server
const server = new AlMusaedServer();
server.start(parseInt(process.env.PORT || '3000'));

export default server;
