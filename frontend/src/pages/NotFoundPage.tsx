import Lightning from "../components/ui/Lightning/Lightning";

export const NotFoundPage = () => {
  return (
<div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
  <Lightning
    hue={220}
    xOffset={0}
    speed={1}
    intensity={1}
    size={1}
  />
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      color: 'white',
    }}
  >
    <h1 style={{ fontSize: '6rem', fontWeight: 'bold' }}>404</h1>
    <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
      Sorry, the page you are looking for cannot be found.
    </p>
    <p style={{ fontSize: '1rem', marginTop: '1rem' }}>
      But don't worry, you can always go back to the <a href="/" style={{ color: 'lightblue', textDecoration: 'underline' }}>home page</a>.
    </p>
  </div>
</div>

  );
};