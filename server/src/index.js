import './database/index.js';
import { app } from './app.js';
import { config } from './config.js';

import { isValidMove } from '../../shared/src/taskRules.js';

app.listen(config.PORT, () => console.log(`Server on http://localhost:${config.PORT}`));