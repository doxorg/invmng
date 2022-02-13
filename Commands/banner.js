async function Url(victimId, { format = true, defFormat = "webp", size = 512 } = {}) {
  if(![16, 32, 64, 128, 256, 512, 1024, 2048, 4096].includes(size)) return;
  if(!["webp", "png", "jpg", "jpeg"].includes(defFormat)) return;
  const victim = await client.api.users(victimId).get();
  if(!victim.banner) return null;
  const r = `?size=${size}`;
  const b = `https://cdn.discordapp.com/banners/${victimId}/${victim.banner}`;
  if (format) {
    const { h } = await axios.head(b);
    if (h && h.hasOwnProperty("content-type")) {
      return b + (h["content-type"] == "image/gif" ? ".gif" : `.${defFormat}`) + r;
    };
  };
  return b + `.${defFormat}` + r;
}; 
