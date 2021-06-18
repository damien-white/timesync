function onPanic(reason, exitCode = 1) {
  console.error('Fatal error. Unexpected error occurred at runtime:\n', reason);
  process.exit(exitCode);
}

async function startServer() {
  process.on('unhandledRejection', async (error) => {
    onPanic(error);
  });

  console.log('Server successfully started!');
}

startServer().catch((error) => {
  onPanic(error);
});
