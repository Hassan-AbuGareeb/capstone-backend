import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [toke, setToke] = useState(false);

  useEffect(() => {
    const tok = localStorage.getItem("token");
    console.log(tok);
  }, [toke]);

  function handleInputChange(event) {
    const value = event.target.value;
    const field = event.target.name;
    setFormData({ ...formData, [field]: value });
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    const body = {
      email: formData.email,
      password: formData.password,
    };
    const signinResponse = await fetch(
      "http://localhost:3002/customer/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(body),
      }
    );
    if (signinResponse.status != 200) {
      //wrong user name or password
      console.log(await signinResponse.json());
    } else {
      //signed in successfully
      const token = await signinResponse.json();
      //store token
      localStorage.setItem("token", token);
      setToke(true);
      //redirect
      setTimeout(() => {
        router.push("/");
      }, "5000");
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleFormSubmit} method="POST">
        <div className="flex gap-4">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex gap-4">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex gap-4">
          <input type="submit" name="submit" />
        </div>
      </form>
    </div>
  );
}