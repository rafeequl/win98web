import React, { useState, useEffect } from "react";

export default function Clock() {
  const [t, setT] = useState(new Date());
  
  useEffect(() => { 
    const id = setInterval(() => setT(new Date()), 1000); 
    return () => clearInterval(id); 
  }, []);

  return (
    <span style={{ fontFamily: "var(--w98-font)", fontSize: 11 }}>
      {t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
    </span>
  );
}
