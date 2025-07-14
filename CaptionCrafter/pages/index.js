import React, { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Trendy');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const dailyLimit = 3;

  const styles = ['Trendy', 'Funny', 'Poetic', 'Sassy', 'Minimalist'];

  const generateCaption = async () => {
    if (usageCount >= dailyLimit) return alert('Daily limit reached! Upgrade for unlimited captions.');
    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, tone })
      });
      const data = await response.json();
      setCaption(data.caption);
      setUsageCount(usageCount + 1);
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <h1>CaptionCrafter</h1>
      <input
        placeholder="Enter a topic..."
        value={topic}
        onChange={e => setTopic(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />
      <select value={tone} onChange={e => setTone(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 10 }}>
        {styles.map(style => <option key={style}>{style}</option>)}
      </select>
      <button onClick={generateCaption} disabled={loading} style={{ width: '100%', padding: 10 }}>
        {loading ? 'Generating...' : 'Generate Caption'}
      </button>
      {caption && <div style={{ marginTop: 20, padding: 10, border: '1px solid #ccc' }}>{caption}</div>}
      <p style={{ fontSize: 12, textAlign: 'center', marginTop: 10 }}>
        {usageCount} / {dailyLimit} captions used today
      </p>
    </div>
  );
}