// Paper → Components — Kraft → "13 · Globe marker" (node ZX8-0)
// Exported 2026-09-15 with get_jsx format:"inline-styles". Reference only: the app's
// implementation lives in app/src/components. Token references (var(--…)) resolve
// against paper/tokens.css.

export default function Entry13() {
  return (
    <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', fontSynthesis: 'none', gap: '16px', MozOsxFontSmoothing: 'grayscale', overflowWrap: 'anywhere', WebkitFontSmoothing: 'antialiased', width: '1280px' }}>
      <div style={{ alignItems: 'baseline', boxSizing: 'border-box', display: 'flex', gap: '16px' }}>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-subtle-light)', flexShrink: '0', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-micro)', lineHeight: 'var(--leading-micro)', width: '32px' }}>
          13
        </div>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-light)', flexShrink: '0', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-medium)', lineHeight: 'var(--leading-lg)' }}>
          Globe marker
        </div>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-muted-light)', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-sm)' }}>
          One bright dot per person listening, on the night globe (always dark, in both modes). Four states: idle (a 10px accent-core dot with the LED glow; curators get a 1px ring), hover (a peek pill: track, artist, who · where), expanded on click (cover, live position on the mini waveform, the list it is on, Play and Open list; one open at a time, the globe stops turning), and playing (ring goes solid, Play becomes Pause). Idle dots pulse like starlight: each has its own period and phase, and the amplitude follows how squarely the dot faces the camera, so the near side breathes and the horizon barely moves.
        </div>
      </div>
      <div style={{ boxSizing: 'border-box', display: 'flex', gap: '32px' }}>
        <div style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-line)', borderRadius: 'var(--radius-lg)', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', flexShrink: '0', gap: '40px', padding: '32px', width: '1280px' }}>
          <div style={{ alignItems: 'start', boxSizing: 'border-box', display: 'flex', gap: '56px' }}>
            <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', flexShrink: '0', gap: '16px', width: '160px' }}>
              <div style={{ boxSizing: 'border-box', color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)', fontSize: '12px', lineHeight: '16px' }}>
                Idle · member
              </div>
              <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '40px' }}>
                <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '20px', justifyContent: 'center', width: '20px' }}>
                  <div style={{ backgroundColor: 'var(--color-accent-core)', borderRadius: 'calc(infinity * 1px)', boxShadow: 'oklch(78% 0.140 257.5 / 80%) 0px 0px 6px 2px, #5184CD73 0px 0px 16px 5px', boxSizing: 'border-box', flexShrink: '0', height: '10px', width: '10px' }} />
                </div>
              </div>
            </div>
            <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', flexShrink: '0', gap: '16px', width: '160px' }}>
              <div style={{ boxSizing: 'border-box', color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)', fontSize: '12px', lineHeight: '16px' }}>
                Idle · curator
              </div>
              <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '40px' }}>
                <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '20px', justifyContent: 'center', position: 'relative', width: '20px' }}>
                  <div style={{ backgroundColor: 'var(--color-accent-core)', borderRadius: 'calc(infinity * 1px)', boxShadow: 'oklch(78% 0.140 257.5 / 80%) 0px 0px 6px 2px, #5184CD73 0px 0px 16px 5px', boxSizing: 'border-box', flexShrink: '0', height: '10px', width: '10px' }} />
                  <div style={{ borderColor: 'oklch(97% 0.030 257.5 / 50%)', borderRadius: 'calc(infinity * 1px)', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', height: '20px', left: '0px', position: 'absolute', top: '0px', width: '20px' }} />
                </div>
              </div>
            </div>
            <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', flexShrink: '0', gap: '16px', width: '280px' }}>
              <div style={{ boxSizing: 'border-box', color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)', fontSize: '12px', lineHeight: '16px' }}>
                Pulse · amplitude by how squarely the dot faces the camera
              </div>
              <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '40px', height: '40px' }}>
                <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '8px' }}>
                  <div style={{ backgroundColor: 'var(--color-accent-core)', borderRadius: 'calc(infinity * 1px)', boxShadow: 'oklch(78% 0.140 257.5 / 90%) 0px 0px 8px 3px, #5184CD80 0px 0px 18px 6px', boxSizing: 'border-box', flexShrink: '0', height: '12px', width: '12px' }} />
                  <div style={{ boxSizing: 'border-box', color: 'var(--color-text-subtle)', fontFamily: 'var(--font-sans)', fontSize: '11px', lineHeight: '14px' }}>
                    near 1.0 · 2.4–4.8s
                  </div>
                </div>
                <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '8px' }}>
                  <div style={{ backgroundColor: 'var(--color-accent-core)', borderRadius: 'calc(infinity * 1px)', boxShadow: 'oklch(78% 0.140 257.5 / 60%) 0px 0px 6px 2px', boxSizing: 'border-box', flexShrink: '0', height: '10px', opacity: '0.75', width: '10px' }} />
                  <div style={{ boxSizing: 'border-box', color: 'var(--color-text-subtle)', fontFamily: 'var(--font-sans)', fontSize: '11px', lineHeight: '14px' }}>
                    0.5 · half
                  </div>
                </div>
                <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '8px' }}>
                  <div style={{ backgroundColor: 'var(--color-accent-core)', borderRadius: 'calc(infinity * 1px)', boxSizing: 'border-box', flexShrink: '0', height: '9px', opacity: '0.5', width: '9px' }} />
                  <div style={{ boxSizing: 'border-box', color: 'var(--color-text-subtle)', fontFamily: 'var(--font-sans)', fontSize: '11px', lineHeight: '14px' }}>
                    horizon · still
                  </div>
                </div>
              </div>
            </div>
            <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', flexShrink: '0', gap: '16px', width: '320px' }}>
              <div style={{ boxSizing: 'border-box', color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)', fontSize: '12px', lineHeight: '16px' }}>
                Hover · peek
              </div>
              <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '10px' }}>
                <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '20px', justifyContent: 'center', position: 'relative', width: '20px' }}>
                  <div style={{ backgroundColor: 'var(--color-accent-core)', borderRadius: 'calc(infinity * 1px)', boxShadow: 'oklch(78% 0.140 257.5 / 80%) 0px 0px 6px 2px, #5184CD73 0px 0px 16px 5px', boxSizing: 'border-box', flexShrink: '0', height: '13px', width: '13px' }} />
                  <div style={{ borderColor: 'oklch(97% 0.030 257.5 / 50%)', borderRadius: 'calc(infinity * 1px)', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', height: '20px', left: '0px', position: 'absolute', top: '0px', width: '20px' }} />
                </div>
                <div style={{ backgroundColor: '#090609E0', borderColor: '#FFFFFF1F', borderRadius: 'var(--radius-md)', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '1px', paddingBlock: '8px', paddingInline: '12px' }}>
                  <div style={{ boxSizing: 'border-box', color: '#FAFAFA', fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500, lineHeight: '18px' }}>
                    Paper Lanterns
                  </div>
                  <div style={{ boxSizing: 'border-box', color: '#E6E6E6', fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: '18px' }}>
                    Zaya Blue
                  </div>
                  <div style={{ boxSizing: 'border-box', color: '#A89EA9', fontFamily: 'var(--font-sans)', fontSize: '12px', lineHeight: '16px' }}>
                    Sofía Reyes · Mexico City
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ alignItems: 'start', boxSizing: 'border-box', display: 'flex', gap: '56px' }}>
            <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', flexShrink: '0', gap: '16px', width: '340px' }}>
              <div style={{ boxSizing: 'border-box', color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)', fontSize: '12px', lineHeight: '16px' }}>
                Expanded · curator (click)
              </div>
              <div style={{ alignItems: 'start', boxSizing: 'border-box', display: 'flex', gap: '10px' }}>
                <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '20px', justifyContent: 'center', position: 'relative', width: '20px' }}>
                  <div style={{ backgroundColor: 'var(--color-accent-core)', borderRadius: 'calc(infinity * 1px)', boxShadow: 'oklch(78% 0.140 257.5 / 80%) 0px 0px 6px 2px, #5184CD73 0px 0px 16px 5px', boxSizing: 'border-box', flexShrink: '0', height: '13px', width: '13px' }} />
                  <div style={{ borderColor: 'oklch(97% 0.030 257.5 / 50%)', borderRadius: 'calc(infinity * 1px)', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', height: '20px', left: '0px', position: 'absolute', top: '0px', width: '20px' }} />
                </div>
                <div style={{ backgroundColor: '#090609E0', borderColor: '#FFFFFF1F', borderRadius: '8px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', flexShrink: '0', gap: '10px', padding: '12px', width: '296px' }}>
                  <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '10px' }}>
                    <div style={{ backgroundColor: '#241C25', backgroundImage: 'url(https://app.paper.design/file-assets/01KVEA9ZH9NC4H1JMS4CAP1VCP/01M1PGXS7YZ3DN1H5S2RQAQ86R.png)', backgroundPosition: '50%', backgroundSize: 'cover', borderRadius: '6px', boxSizing: 'border-box', flexShrink: '0', height: '48px', width: '48px' }} />
                    <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0px', flexDirection: 'column', flexGrow: '1', gap: '1px' }}>
                      <div style={{ boxSizing: 'border-box', color: '#FAFAFA', fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 500, lineHeight: '20px' }}>
                        Paper Lanterns
                      </div>
                      <div style={{ boxSizing: 'border-box', color: '#E6E6E6', fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: '18px' }}>
                        Zaya Blue
                      </div>
                    </div>
                    <div style={{ alignSelf: 'start', boxSizing: 'border-box', color: '#A89EA9', display: 'flex', flexShrink: '0', flexWrap: 'wrap', fontFamily: 'var(--font-sans)', fontSize: '16px', height: '20px', justifyContent: 'center', lineHeight: '20px', textAlign: 'center', width: '20px' }}>
                      ×
                    </div>
                  </div>
                  <div style={{ boxSizing: 'border-box', flexShrink: '0', height: '24px', position: 'relative', width: '248px' }}>
                    <div style={{ boxSizing: 'border-box', height: '24px', left: '0px', position: 'absolute', top: '0px', width: '248px' }}>
                      <svg width="248" height="24" viewBox="0 0 248 24" xmlns="http://www.w3.org/2000/svg">
                        <g>
                          <rect x="1" y="8" width="2" height="8" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="5" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="9" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="13" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="17" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="21" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="25" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="29" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="33" y="8" width="2" height="8" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="37" y="8" width="2" height="8" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="41" y="8" width="2" height="8" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="45" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="49" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="53" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="57" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="61" y="4" width="2" height="16" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="65" y="3" width="2" height="18" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="69" y="3" width="2" height="18" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="73" y="4" width="2" height="16" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="77" y="4" width="2" height="16" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="81" y="3" width="2" height="18" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="85" y="2" width="2" height="20" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="89" y="4" width="2" height="16" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="93" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="97" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="101" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="105" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="109" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="113" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="117" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="121" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="125" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="129" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="133" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="137" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="141" y="4" width="2" height="16" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="145" y="4" width="2" height="16" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="149" y="3" width="2" height="18" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="153" y="3" width="2" height="18" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="157" y="3" width="2" height="18" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="161" y="4" width="2" height="16" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="165" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="169" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="173" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="177" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="181" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="185" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="189" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="193" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="197" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="201" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="205" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="209" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="213" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="217" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="221" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="225" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="229" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="233" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="237" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="241" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="245" y="8" width="2" height="8" rx="1" fill="oklch(37.2% 0.025 323)" />
                        </g>
                      </svg>
                    </div>
                    <div style={{ boxSizing: 'border-box', height: '24px', left: '0px', position: 'absolute', top: '0px', width: '248px' }}>
                      <svg width="248" height="24" viewBox="0 0 248 24" xmlns="http://www.w3.org/2000/svg">
                        <g>
                          <rect x="1" y="8" width="2" height="8" rx="1" fill="#FAFAFA" />
                          <rect x="5" y="7" width="2" height="10" rx="1" fill="#FAFAFA" />
                          <rect x="9" y="7" width="2" height="10" rx="1" fill="#FAFAFA" />
                          <rect x="13" y="7" width="2" height="10" rx="1" fill="#FAFAFA" />
                          <rect x="17" y="7" width="2" height="10" rx="1" fill="#FAFAFA" />
                          <rect x="21" y="7" width="2" height="10" rx="1" fill="#FAFAFA" />
                          <rect x="25" y="7" width="2" height="10" rx="1" fill="#FAFAFA" />
                          <rect x="29" y="7" width="2" height="10" rx="1" fill="#FAFAFA" />
                          <rect x="33" y="8" width="2" height="8" rx="1" fill="#FAFAFA" />
                          <rect x="37" y="8" width="2" height="8" rx="1" fill="#FAFAFA" />
                          <rect x="41" y="8" width="2" height="8" rx="1" fill="#FAFAFA" />
                          <rect x="45" y="6" width="2" height="12" rx="1" fill="#FAFAFA" />
                          <rect x="49" y="6" width="2" height="12" rx="1" fill="#FAFAFA" />
                          <rect x="53" y="5" width="2" height="14" rx="1" fill="#FAFAFA" />
                          <rect x="57" y="6" width="2" height="12" rx="1" fill="#FAFAFA" />
                          <rect x="61" y="4" width="2" height="16" rx="1" fill="#FAFAFA" />
                          <rect x="65" y="3" width="2" height="18" rx="1" fill="#FAFAFA" />
                          <rect x="69" y="3" width="2" height="18" rx="1" fill="#FAFAFA" />
                          <rect x="73" y="4" width="2" height="16" rx="1" fill="#FAFAFA" />
                        </g>
                      </svg>
                    </div>
                    <div style={{ backgroundColor: '#FAFAFA', boxSizing: 'border-box', height: '32px', left: '74px', position: 'absolute', top: '-4px', width: '1px' }} />
                  </div>
                  <div style={{ boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', marginTop: '-4px', width: '248px' }}>
                    <div style={{ boxSizing: 'border-box', color: '#A89EA9', fontFamily: 'var(--font-sans)', fontSize: '11px', lineHeight: '14px' }}>
                      1:12
                    </div>
                    <div style={{ boxSizing: 'border-box', color: '#A89EA9', fontFamily: 'var(--font-sans)', fontSize: '11px', lineHeight: '14px' }}>
                      3:52
                    </div>
                  </div>
                  <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '8px' }}>
                    <div style={{ backgroundColor: '#241C25', backgroundImage: 'url(https://app.paper.design/file-assets/01KVEA9ZH9NC4H1JMS4CAP1VCP/01M1PH3RGEN44KWSP14GQYMARR.png)', backgroundPosition: '50%', backgroundSize: 'cover', borderRadius: 'calc(infinity * 1px)', boxSizing: 'border-box', flexShrink: '0', height: '20px', width: '20px' }} />
                    <div style={{ boxSizing: 'border-box', color: '#A89EA9', fontFamily: 'var(--font-sans)', fontSize: '12px', lineHeight: '16px' }}>
                      Sofía Reyes · on Golden Hour
                    </div>
                  </div>
                  <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '14px' }}>
                    <div style={{ alignItems: 'center', backgroundColor: '#FAFAFA', borderRadius: '6px', boxSizing: 'border-box', display: 'flex', height: '32px', paddingInline: '14px' }}>
                      <div style={{ boxSizing: 'border-box', color: '#0C0D0E', fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500, lineHeight: '18px' }}>
                        Play
                      </div>
                    </div>
                    <div style={{ boxSizing: 'border-box', color: '#A89EA9', fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: '18px' }}>
                      Open list
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', flexShrink: '0', gap: '16px', width: '340px' }}>
              <div style={{ boxSizing: 'border-box', color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)', fontSize: '12px', lineHeight: '16px' }}>
                Expanded · member (no name, no cover on file)
              </div>
              <div style={{ alignItems: 'start', boxSizing: 'border-box', display: 'flex', gap: '10px' }}>
                <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '20px', justifyContent: 'center', width: '20px' }}>
                  <div style={{ backgroundColor: 'var(--color-accent-core)', borderRadius: 'calc(infinity * 1px)', boxShadow: 'oklch(78% 0.140 257.5 / 80%) 0px 0px 6px 2px, #5184CD73 0px 0px 16px 5px', boxSizing: 'border-box', flexShrink: '0', height: '13px', width: '13px' }} />
                </div>
                <div style={{ backgroundColor: '#090609E0', borderColor: '#FFFFFF1F', borderRadius: '8px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', flexShrink: '0', gap: '10px', padding: '12px', width: '296px' }}>
                  <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '10px' }}>
                    <div style={{ backgroundColor: '#241C25', borderRadius: '6px', boxSizing: 'border-box', flexShrink: '0', height: '48px', width: '48px' }} />
                    <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0px', flexDirection: 'column', flexGrow: '1', gap: '1px' }}>
                      <div style={{ boxSizing: 'border-box', color: '#FAFAFA', fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 500, lineHeight: '20px' }}>
                        Zoning
                      </div>
                      <div style={{ boxSizing: 'border-box', color: '#E6E6E6', fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: '18px' }}>
                        Cass & The Terminals
                      </div>
                    </div>
                    <div style={{ alignSelf: 'start', boxSizing: 'border-box', color: '#A89EA9', display: 'flex', flexShrink: '0', flexWrap: 'wrap', fontFamily: 'var(--font-sans)', fontSize: '16px', height: '20px', justifyContent: 'center', lineHeight: '20px', textAlign: 'center', width: '20px' }}>
                      ×
                    </div>
                  </div>
                  <div style={{ boxSizing: 'border-box', flexShrink: '0', height: '24px', position: 'relative', width: '248px' }}>
                    <div style={{ boxSizing: 'border-box', height: '24px', left: '0px', position: 'absolute', top: '0px', width: '248px' }}>
                      <svg width="248" height="24" viewBox="0 0 248 24" xmlns="http://www.w3.org/2000/svg">
                        <g>
                          <rect x="1" y="8" width="2" height="8" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="5" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="9" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="13" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="17" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="21" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="25" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="29" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="33" y="8" width="2" height="8" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="37" y="8" width="2" height="8" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="41" y="8" width="2" height="8" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="45" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="49" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="53" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="57" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="61" y="4" width="2" height="16" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="65" y="3" width="2" height="18" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="69" y="3" width="2" height="18" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="73" y="4" width="2" height="16" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="77" y="4" width="2" height="16" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="81" y="3" width="2" height="18" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="85" y="2" width="2" height="20" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="89" y="4" width="2" height="16" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="93" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="97" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="101" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="105" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="109" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="113" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="117" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="121" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="125" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="129" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="133" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="137" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="141" y="4" width="2" height="16" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="145" y="4" width="2" height="16" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="149" y="3" width="2" height="18" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="153" y="3" width="2" height="18" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="157" y="3" width="2" height="18" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="161" y="4" width="2" height="16" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="165" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="169" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="173" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="177" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="181" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="185" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="189" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="193" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="197" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="201" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="205" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="209" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="213" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="217" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="221" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="225" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="229" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="233" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="237" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="241" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="245" y="8" width="2" height="8" rx="1" fill="oklch(37.2% 0.025 323)" />
                        </g>
                      </svg>
                    </div>
                    <div style={{ boxSizing: 'border-box', height: '24px', left: '0px', position: 'absolute', top: '0px', width: '248px' }}>
                      <svg width="248" height="24" viewBox="0 0 248 24" xmlns="http://www.w3.org/2000/svg">
                        <g>
                          <rect x="1" y="8" width="2" height="8" rx="1" fill="#FAFAFA" />
                          <rect x="5" y="7" width="2" height="10" rx="1" fill="#FAFAFA" />
                          <rect x="9" y="7" width="2" height="10" rx="1" fill="#FAFAFA" />
                          <rect x="13" y="7" width="2" height="10" rx="1" fill="#FAFAFA" />
                          <rect x="17" y="7" width="2" height="10" rx="1" fill="#FAFAFA" />
                        </g>
                      </svg>
                    </div>
                    <div style={{ backgroundColor: '#FAFAFA', boxSizing: 'border-box', height: '32px', left: '18px', position: 'absolute', top: '-4px', width: '1px' }} />
                  </div>
                  <div style={{ boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', marginTop: '-4px', width: '248px' }}>
                    <div style={{ boxSizing: 'border-box', color: '#A89EA9', fontFamily: 'var(--font-sans)', fontSize: '11px', lineHeight: '14px' }}>
                      0:12
                    </div>
                    <div style={{ boxSizing: 'border-box', color: '#A89EA9', fontFamily: 'var(--font-sans)', fontSize: '11px', lineHeight: '14px' }}>
                      4:18
                    </div>
                  </div>
                  <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '8px' }}>
                    <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '20px', justifyContent: 'center', width: '20px' }}>
                      <div style={{ backgroundColor: 'var(--color-accent-core)', borderRadius: 'calc(infinity * 1px)', boxShadow: 'oklch(78% 0.140 257.5 / 90%) 0px 0px 4px 1px', boxSizing: 'border-box', flexShrink: '0', height: '6px', width: '6px' }} />
                    </div>
                    <div style={{ boxSizing: 'border-box', color: '#A89EA9', fontFamily: 'var(--font-sans)', fontSize: '12px', lineHeight: '16px' }}>
                      Someone in Jakarta · on Poolside
                    </div>
                  </div>
                  <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '14px' }}>
                    <div style={{ alignItems: 'center', backgroundColor: '#FAFAFA', borderRadius: '6px', boxSizing: 'border-box', display: 'flex', height: '32px', paddingInline: '14px' }}>
                      <div style={{ boxSizing: 'border-box', color: '#0C0D0E', fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500, lineHeight: '18px' }}>
                        Play
                      </div>
                    </div>
                    <div style={{ boxSizing: 'border-box', color: '#A89EA9', fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: '18px' }}>
                      Open list
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', flexShrink: '0', gap: '16px', width: '340px' }}>
              <div style={{ boxSizing: 'border-box', color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)', fontSize: '12px', lineHeight: '16px' }}>
                Playing · this dot is in the player
              </div>
              <div style={{ alignItems: 'start', boxSizing: 'border-box', display: 'flex', gap: '10px' }}>
                <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '20px', justifyContent: 'center', position: 'relative', width: '20px' }}>
                  <div style={{ backgroundColor: 'var(--color-accent-core)', borderRadius: 'calc(infinity * 1px)', boxShadow: 'oklch(78% 0.140 257.5 / 80%) 0px 0px 6px 2px, #5184CD73 0px 0px 16px 5px', boxSizing: 'border-box', flexShrink: '0', height: '13px', width: '13px' }} />
                  <div style={{ borderColor: 'var(--color-accent-core)', borderRadius: 'calc(infinity * 1px)', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', height: '20px', left: '0px', position: 'absolute', top: '0px', width: '20px' }} />
                </div>
                <div style={{ backgroundColor: '#090609E0', borderColor: '#FFFFFF1F', borderRadius: '8px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', flexShrink: '0', gap: '10px', padding: '12px', width: '296px' }}>
                  <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '10px' }}>
                    <div style={{ backgroundColor: '#241C25', backgroundImage: 'url(https://app.paper.design/file-assets/01KVEA9ZH9NC4H1JMS4CAP1VCP/01M1PGXS7YZ3DN1H5S2RQAQ86R.png)', backgroundPosition: '50%', backgroundSize: 'cover', borderRadius: '6px', boxSizing: 'border-box', flexShrink: '0', height: '48px', width: '48px' }} />
                    <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0px', flexDirection: 'column', flexGrow: '1', gap: '1px' }}>
                      <div style={{ boxSizing: 'border-box', color: '#FAFAFA', fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 500, lineHeight: '20px' }}>
                        Paper Lanterns
                      </div>
                      <div style={{ boxSizing: 'border-box', color: '#E6E6E6', fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: '18px' }}>
                        Zaya Blue
                      </div>
                    </div>
                    <div style={{ alignSelf: 'start', boxSizing: 'border-box', color: '#A89EA9', display: 'flex', flexShrink: '0', flexWrap: 'wrap', fontFamily: 'var(--font-sans)', fontSize: '16px', height: '20px', justifyContent: 'center', lineHeight: '20px', textAlign: 'center', width: '20px' }}>
                      ×
                    </div>
                  </div>
                  <div style={{ boxSizing: 'border-box', flexShrink: '0', height: '24px', position: 'relative', width: '248px' }}>
                    <div style={{ boxSizing: 'border-box', height: '24px', left: '0px', position: 'absolute', top: '0px', width: '248px' }}>
                      <svg width="248" height="24" viewBox="0 0 248 24" xmlns="http://www.w3.org/2000/svg">
                        <g>
                          <rect x="1" y="8" width="2" height="8" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="5" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="9" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="13" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="17" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="21" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="25" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="29" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="33" y="8" width="2" height="8" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="37" y="8" width="2" height="8" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="41" y="8" width="2" height="8" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="45" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="49" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="53" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="57" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="61" y="4" width="2" height="16" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="65" y="3" width="2" height="18" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="69" y="3" width="2" height="18" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="73" y="4" width="2" height="16" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="77" y="4" width="2" height="16" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="81" y="3" width="2" height="18" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="85" y="2" width="2" height="20" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="89" y="4" width="2" height="16" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="93" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="97" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="101" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="105" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="109" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="113" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="117" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="121" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="125" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="129" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="133" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="137" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="141" y="4" width="2" height="16" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="145" y="4" width="2" height="16" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="149" y="3" width="2" height="18" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="153" y="3" width="2" height="18" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="157" y="3" width="2" height="18" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="161" y="4" width="2" height="16" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="165" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="169" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="173" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="177" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="181" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="185" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="189" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="193" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="197" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="201" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="205" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="209" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="213" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="217" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="221" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="225" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="229" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="233" y="5" width="2" height="14" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="237" y="6" width="2" height="12" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="241" y="7" width="2" height="10" rx="1" fill="oklch(37.2% 0.025 323)" />
                          <rect x="245" y="8" width="2" height="8" rx="1" fill="oklch(37.2% 0.025 323)" />
                        </g>
                      </svg>
                    </div>
                    <div style={{ boxSizing: 'border-box', height: '24px', left: '0px', position: 'absolute', top: '0px', width: '248px' }}>
                      <svg width="248" height="24" viewBox="0 0 248 24" xmlns="http://www.w3.org/2000/svg">
                        <g>
                          <rect x="1" y="8" width="2" height="8" rx="1" fill="#FAFAFA" />
                          <rect x="5" y="7" width="2" height="10" rx="1" fill="#FAFAFA" />
                          <rect x="9" y="7" width="2" height="10" rx="1" fill="#FAFAFA" />
                          <rect x="13" y="7" width="2" height="10" rx="1" fill="#FAFAFA" />
                          <rect x="17" y="7" width="2" height="10" rx="1" fill="#FAFAFA" />
                          <rect x="21" y="7" width="2" height="10" rx="1" fill="#FAFAFA" />
                          <rect x="25" y="7" width="2" height="10" rx="1" fill="#FAFAFA" />
                          <rect x="29" y="7" width="2" height="10" rx="1" fill="#FAFAFA" />
                          <rect x="33" y="8" width="2" height="8" rx="1" fill="#FAFAFA" />
                          <rect x="37" y="8" width="2" height="8" rx="1" fill="#FAFAFA" />
                          <rect x="41" y="8" width="2" height="8" rx="1" fill="#FAFAFA" />
                          <rect x="45" y="6" width="2" height="12" rx="1" fill="#FAFAFA" />
                          <rect x="49" y="6" width="2" height="12" rx="1" fill="#FAFAFA" />
                          <rect x="53" y="5" width="2" height="14" rx="1" fill="#FAFAFA" />
                          <rect x="57" y="6" width="2" height="12" rx="1" fill="#FAFAFA" />
                          <rect x="61" y="4" width="2" height="16" rx="1" fill="#FAFAFA" />
                          <rect x="65" y="3" width="2" height="18" rx="1" fill="#FAFAFA" />
                          <rect x="69" y="3" width="2" height="18" rx="1" fill="#FAFAFA" />
                          <rect x="73" y="4" width="2" height="16" rx="1" fill="#FAFAFA" />
                          <rect x="77" y="4" width="2" height="16" rx="1" fill="#FAFAFA" />
                          <rect x="81" y="3" width="2" height="18" rx="1" fill="#FAFAFA" />
                          <rect x="85" y="2" width="2" height="20" rx="1" fill="#FAFAFA" />
                          <rect x="89" y="4" width="2" height="16" rx="1" fill="#FAFAFA" />
                          <rect x="93" y="5" width="2" height="14" rx="1" fill="#FAFAFA" />
                          <rect x="97" y="6" width="2" height="12" rx="1" fill="#FAFAFA" />
                          <rect x="101" y="6" width="2" height="12" rx="1" fill="#FAFAFA" />
                          <rect x="105" y="6" width="2" height="12" rx="1" fill="#FAFAFA" />
                          <rect x="109" y="5" width="2" height="14" rx="1" fill="#FAFAFA" />
                          <rect x="113" y="5" width="2" height="14" rx="1" fill="#FAFAFA" />
                          <rect x="117" y="5" width="2" height="14" rx="1" fill="#FAFAFA" />
                          <rect x="121" y="6" width="2" height="12" rx="1" fill="#FAFAFA" />
                          <rect x="125" y="6" width="2" height="12" rx="1" fill="#FAFAFA" />
                          <rect x="129" y="5" width="2" height="14" rx="1" fill="#FAFAFA" />
                          <rect x="133" y="5" width="2" height="14" rx="1" fill="#FAFAFA" />
                          <rect x="137" y="5" width="2" height="14" rx="1" fill="#FAFAFA" />
                          <rect x="141" y="4" width="2" height="16" rx="1" fill="#FAFAFA" />
                          <rect x="145" y="4" width="2" height="16" rx="1" fill="#FAFAFA" />
                          <rect x="149" y="3" width="2" height="18" rx="1" fill="#FAFAFA" />
                          <rect x="153" y="3" width="2" height="18" rx="1" fill="#FAFAFA" />
                        </g>
                      </svg>
                    </div>
                    <div style={{ backgroundColor: '#FAFAFA', boxSizing: 'border-box', height: '32px', left: '154px', position: 'absolute', top: '-4px', width: '1px' }} />
                  </div>
                  <div style={{ boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', marginTop: '-4px', width: '248px' }}>
                    <div style={{ boxSizing: 'border-box', color: '#A89EA9', fontFamily: 'var(--font-sans)', fontSize: '11px', lineHeight: '14px' }}>
                      2:24
                    </div>
                    <div style={{ boxSizing: 'border-box', color: '#A89EA9', fontFamily: 'var(--font-sans)', fontSize: '11px', lineHeight: '14px' }}>
                      3:52
                    </div>
                  </div>
                  <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '8px' }}>
                    <div style={{ backgroundColor: '#241C25', backgroundImage: 'url(https://app.paper.design/file-assets/01KVEA9ZH9NC4H1JMS4CAP1VCP/01M1PH3RGEN44KWSP14GQYMARR.png)', backgroundPosition: '50%', backgroundSize: 'cover', borderRadius: 'calc(infinity * 1px)', boxSizing: 'border-box', flexShrink: '0', height: '20px', width: '20px' }} />
                    <div style={{ boxSizing: 'border-box', color: '#A89EA9', fontFamily: 'var(--font-sans)', fontSize: '12px', lineHeight: '16px' }}>
                      Sofía Reyes · on Golden Hour
                    </div>
                  </div>
                  <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '14px' }}>
                    <div style={{ alignItems: 'center', backgroundColor: '#FAFAFA', borderRadius: '6px', boxSizing: 'border-box', display: 'flex', height: '32px', paddingInline: '14px' }}>
                      <div style={{ boxSizing: 'border-box', color: '#0C0D0E', fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500, lineHeight: '18px' }}>
                        Pause
                      </div>
                    </div>
                    <div style={{ boxSizing: 'border-box', color: '#A89EA9', fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: '18px' }}>
                      Open list
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
