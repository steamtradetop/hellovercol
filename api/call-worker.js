module.exports = async (req, res) => {
  // 设置响应头部
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  try {
    // 这里应该替换为实际的Cloudflare Worker URL
    // 示例: https://your-worker.your-subdomain.workers.dev/
    const workerUrl = process.env.CLOUDFLARE_WORKER_URL || 'https://loginworker.steamtradetop.workers.dev/wku/users/users/login';
    
    // 如果是OPTIONS请求，则直接返回
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    
    // 调用Cloudflare Worker
    // 注意：在真实环境中你可能需要根据需要添加认证头或其他参数
    const response = await fetch(workerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 添加其他需要的头部
      },
      body: JSON.stringify({
        p: ["guest3", "084e0343a0486ff05530df6c705c8bb4"],
        cols: ["id", "uname", "email"],
        getstart: 0,
        getnumber: 10,
        order: "id DESC"
      })
    });
    
    const data = await response.json();
    
    // 返回从Cloudflare Worker获得的结果
    res.status(200).json({
      success: true,
      workerResponse: data,
      timestamp: new Date().toISOString(),
      note: "Called via Vercel API route"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
};