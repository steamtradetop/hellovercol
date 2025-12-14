const http = require('http');
const url = require('url');

// 创建服务器
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  // 设置CORS头部
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // 主页路由
  if (parsedUrl.pathname === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Vercel + Cloudflare Worker Demo</title>
        </head>
        <body>
          <h1>Vercel + Cloudflare Worker Demo</h1>
          <p>This is a demo application deployed on Vercel that can call Cloudflare Workers.</p>
          <button id="callWorker">Call Cloudflare Worker</button>
          <div id="result"></div>
          
          <script>
            document.getElementById('callWorker').addEventListener('click', async () => {
              try {
                const response = await fetch('/api/call-worker');
                const data = await response.json();
                document.getElementById('result').innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
              } catch (error) {
                document.getElementById('result').innerHTML = '<p>Error: ' + error.message + '</p>';
              }
            });
          </script>
        </body>
      </html>
    `);
    return;
  }
  
  // API路由 - 调用Cloudflare Worker
  if (parsedUrl.pathname === '/api/call-worker' && req.method === 'GET') {
    // 这里是调用Cloudflare Worker的地方
    // 在实际使用中，你需要替换为真实的Cloudflare Worker URL
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: "This endpoint would call a Cloudflare Worker in a real implementation",
      timestamp: new Date().toISOString(),
      note: "Replace the placeholder with actual Cloudflare Worker URL"
    }));
    return;
  }
  
  // 404处理
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(\`Server running on port \$\{PORT\}\`);
});

// This is a simple placeholder file
// Static files are now served from the public/ directory
// Keeping this file for backward compatibility
module.exports = (req, res) => {
  res.status(200).send('Hello World!');
};
