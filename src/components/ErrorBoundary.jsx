import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Mia website render error:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          minHeight:'100vh',
          padding:'120px 24px',
          background:'#f7f0e5',
          color:'#590a10',
          fontFamily:'Arial, sans-serif'
        }}>
          <h1 style={{fontSize:'32px'}}>Greška pri učitavanju sajta</h1>
          <p>Otvori browser console. Greška je:</p>
          <pre style={{whiteSpace:'pre-wrap'}}>{String(this.state.error?.stack || this.state.error)}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}
