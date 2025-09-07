document.getElementById("generate").addEventListener("click", async () => {
  const preset = document.getElementById("preset").value;
  const output = document.getElementById("output");

  if (!preset) {
    output.innerHTML = "<p>Please choose a princess style ✨</p>";
    return;
  }

  output.innerHTML = "<p>✨ Generating your princess... (this may take 10–30s)</p>";

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: preset }),
    });

    const data = await res.json();

    if (data.imageUrl) {
      output.innerHTML = `<img src="${data.imageUrl}" alt="Urban Princess">`;
    } else {
      output.innerHTML = `<p>Something went wrong: ${data.error || "unknown"}</p>`;
    }
  } catch (err) {
    console.error(err);
    output.innerHTML = "<p>Error generating image — check console or redeploy.</p>";
  }
});
