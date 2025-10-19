export default function Resources() {
  return (
    <div className="card" style={{ padding: "1.2rem" }}>
      <h2 style={{ marginTop: 0 }}>Resources</h2>
      <table className="table" style={{ marginTop: ".6rem" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Grounding Techniques (5-4-3-2-1)</td>
            <td>
              <a
                href="https://www.healthline.com/health/grounding-techniques"
                target="_blank"
                rel="noreferrer"
              >
                Open
              </a>
            </td>
          </tr>
          <tr>
            <td>Sleep Hygiene for Students</td>
            <td>
              <a
                href="https://www.sleepfoundation.org/sleep-hygiene"
                target="_blank"
                rel="noreferrer"
              >
                Open
              </a>
            </td>
          </tr>
          <tr>
            <td>Pomodoro (25/5)</td>
            <td>
              <a href="https://pomofocus.io/" target="_blank" rel="noreferrer">
                Open
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
