export const getSessionRolFromLocalStorage = (): number | null => {
    const sessionRolString = localStorage.getItem('sessionRol');
    if (sessionRolString) {
      return Number(sessionRolString);
    }
    return null;
  };

