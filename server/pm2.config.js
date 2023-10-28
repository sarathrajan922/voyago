module.exports = {
    apps: [
      {
        name: '',
        script: 'build/app.js',
        env: {
          NODE_ENV: 'production', 
        },
        env_file: '.env', 
      },
    ],
};