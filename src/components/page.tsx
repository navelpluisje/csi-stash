import Image from 'next/image';

export const Page: React.FC<{}> = ({children}) => (
  <>
    <header className="site-header">
      <img src="/images/logo.png" alt="" /> 
      <h4>-stash</h4> 
    </header>
    <main className="site-content">
      {children}
    </main>
    <footer className="site-footer">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
  </>
);