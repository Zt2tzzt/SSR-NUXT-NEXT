import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/cart">
        <button>cart</button>
      </Link>
      <Link href="/profile">
        <button>profile</button>
      </Link>
      <h1>Hello Next App</h1>
    </div>
  )
}
