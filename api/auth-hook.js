// Supabase Auth HTTP Webhook Hook Endpoint
// Handles passwordless authentication events (Send SMS / Send Email hooks)

module.exports = async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Validate Authorization header using our Hook Secret
    const authHeader = req.headers.authorization;
    const hookSecret = process.env.SUPABASE_AUTH_HOOK_SECRET || "sb_auth_hook_secret_token";
    
    if (authHeader && authHeader !== `Bearer ${hookSecret}`) {
      return res.status(401).json({ error: "Unauthorized hook access" });
    }

    // Parse hook payload
    const body = req.body;
    console.log("📥 Received Supabase Auth Webhook payload:", JSON.stringify(body, null, 2));

    const { event, otp, user } = body;
    const recipient = user?.email || user?.phone || "Unknown User";

    // Log the OTP code directly to the server console
    console.log(`\n======================================================`);
    console.log(`🔑 [Supabase Webhook OTP] Code: ${otp}`);
    console.log(`📧 Send Event: ${event}`);
    console.log(`👤 Recipient: ${recipient}`);
    console.log(`======================================================\n`);

    return res.status(200).json({
      status: "success",
      message: `OTP code logged successfully for ${recipient}`
    });

  } catch (err) {
    console.error("❌ Auth hook handler error:", err);
    return res.status(500).json({ error: err.message });
  }
}
