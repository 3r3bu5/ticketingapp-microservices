import Link from 'next/link';
export default function Header({ currentUser }) {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand"> Ticketing</a>
        </Link>
        <dev className="d-flex">
          {currentUser != null ? (
            <Link
              href="/auth/signout"
              className="btn btn-outline-primary"
              type="submit"
            >
              <a className="btn btn-outline-primary" type="submit">
                signout
              </a>
            </Link>
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="btn btn-outline-primary mr-3"
                type="submit"
              >
                <a className="btn btn-outline-primary" type="submit">
                  signin
                </a>
              </Link>
              <Link
                href="/auth/signup"
                className="btn btn-outline-primary"
                type="submit"
              >
                <a className="btn btn-outline-primary" type="submit">
                  signup
                </a>
              </Link>
            </>
          )}
        </dev>
      </div>
    </nav>
  );
}
