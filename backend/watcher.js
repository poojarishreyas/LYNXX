import chokidar from "chokidar";

export function watchDirectory(dir, onChange) {
  const watcher = chokidar.watch(dir, {
    ignored: [/(^|[\/\\])\./, '**/node_modules/**'],
    persistent: true,
    ignoreInitial: true,
  });

  watcher.on('all', (event, filePath) => {
    console.log(`${event}: ${filePath}`);
    onChange({ event, path: filePath });
  });

  watcher.on('error', (error) => {
    console.error(`Watcher error: ${error}`);
  });

  return watcher;
}