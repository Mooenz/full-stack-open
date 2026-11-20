

import { PORT } from './utils/config.ts';
import app from './app.ts';
import { infoMessage } from './utils/logger.ts';

app.listen(PORT, () => {
	infoMessage(`Server running on port ${PORT}`);
});
