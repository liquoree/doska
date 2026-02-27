import Button from '@/shared/ui/Button/Button';
import './Forms.scss'

export default function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        localStorage.setItem("token", "demo");
        onSuccess();
      }}
    >
      <div className='input-box'>
        <input placeholder="Email" className='auth-input' />
        <input placeholder="Password" className='auth-input' type="password" />
        <Button type="submit" variant="primary" fullWidth>
          Войти
        </Button>
      </div>
    </form>
  );
}