export default function ProfilePage() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Profile</h1>
      <button onClick={() => localStorage.removeItem("token")}>Logout</button>
    </div>
  );
}