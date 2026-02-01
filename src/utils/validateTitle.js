export function validateTitle(title) {
  const trimmed = title.trim();

  if (!trimmed) return "Title required";

  if (!/^[A-Za-z]/.test(trimmed)) {
    return "Title must start with a letter (A-Z). Numbers/spaces first not allowed";
  }

  if (!/^[A-Za-z][A-Za-z0-9 ]*$/.test(trimmed)) {
    return "Only letters, numbers and spaces allowed (no symbols)";
  }

  if (/^[0-9 ]+$/.test(trimmed)) {
    return "Title cannot be only numbers";
  }

  if (trimmed.length < 3) {
    return "Title must be at least 3 letters";
  }

  return ""; // ✅ no error
}
