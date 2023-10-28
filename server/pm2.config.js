module.exports = {
    apps: [
      {
        name: 'voyago',
        script: 'build/app.js',
        env: {
          NODE_ENV: 'production', 
        },
        env_file: '.env', 
      },
    ],
};