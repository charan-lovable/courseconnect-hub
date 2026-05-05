export type User = { name: string; email: string };

const USER_KEY = "scm_user";
const USERS_KEY = "scm_users";

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function login(email: string, password: string): User {
  const users: Record<string, { name: string; password: string }> = JSON.parse(
    localStorage.getItem(USERS_KEY) || "{}"
  );
  const u = users[email];
  if (!u || u.password !== password) throw new Error("Invalid email or password");
  const user = { name: u.name, email };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

export function signup(name: string, email: string, password: string): User {
  const users: Record<string, { name: string; password: string }> = JSON.parse(
    localStorage.getItem(USERS_KEY) || "{}"
  );
  if (users[email]) throw new Error("An account with that email already exists");
  users[email] = { name, password };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  const user = { name, email };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

export function logout() {
  localStorage.removeItem(USER_KEY);
}
