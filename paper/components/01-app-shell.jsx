// Paper → Components — Kraft → "01 · App shell" (node H6V-0)
// Exported 2026-09-15 with get_jsx format:"inline-styles". Reference only: the app's
// implementation lives in app/src/components. Token references (var(--…)) resolve
// against paper/tokens.css.

export default function Entry01() {
  return (
    <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', fontSize: '12px', fontSynthesis: 'none', gap: '16px', lineHeight: '16px', MozOsxFontSmoothing: 'grayscale', overflowWrap: 'anywhere', WebkitFontSmoothing: 'antialiased', width: '1280px' }}>
      <div style={{ alignItems: 'baseline', boxSizing: 'border-box', display: 'flex', gap: '16px' }}>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-subtle-light)', display: 'inline-block', flexShrink: '0', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-micro)', lineHeight: 'var(--leading-micro)', width: '32px' }}>
          01
        </div>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-light)', display: 'inline-block', flexShrink: '0', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-medium)', lineHeight: 'var(--leading-lg)', width: 'max-content' }}>
          App shell
        </div>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-muted-light)', display: 'inline-block', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-sm)' }}>
          Top bar 52 on surface, sidebar 240 on surface, player bar 89 on surface. The page itself sits on bg. Three chrome pieces, one material.
        </div>
      </div>
      <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-line)', borderRadius: 'var(--radius-lg)', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px', width: '1280px' }}>
          <div style={{ alignItems: 'center', backgroundColor: 'var(--color-surface)', borderBottomColor: 'var(--color-line-subtle)', borderBottomStyle: 'solid', borderBottomWidth: '1px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '52px', justifyContent: 'space-between', paddingLeft: 'var(--spacing-4)', paddingRight: 'var(--spacing-5)' }}>
            <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: 'var(--spacing-6)', paddingInline: 'var(--spacing-0-5)' }}>
              <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '6px', height: 'fit-content', width: 'fit-content' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px', flexShrink: '0' }}>
                  <path d="M0 0H5V16H0ZM5 5H11V11H5ZM11 0H16V5H11ZM11 11H16V16H11Z" fill="var(--color-text)" />
                </svg>
                <div style={{ boxSizing: 'border-box', color: 'var(--color-text)', display: 'inline-block', fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-display-medium)', lineHeight: 'var(--leading-lg)', textWrap: 'initial', whiteSpaceCollapse: 'preserve' }}>
                  Kraft
                </div>
              </div>
              <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: 'var(--spacing-1)' }}>
                <div style={{ alignItems: 'center', backgroundColor: 'var(--color-hover)', borderRadius: 'var(--radius-md)', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '28px', justifyContent: 'center', width: '28px' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
                    <path d="M9 10L5 7l4-3" fill="none" stroke="#FFFFFF66" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div style={{ alignItems: 'center', backgroundColor: 'var(--color-hover)', borderRadius: 'var(--radius-md)', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '28px', justifyContent: 'center', width: '28px' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
                    <path d="M5 4l4 3-4 3" fill="none" stroke="#FFFFFF66" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
            <div style={{ alignItems: 'center', backgroundColor: 'var(--color-well)', borderColor: 'var(--color-line-strong)', borderRadius: 'var(--radius-md)', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexGrow: '1', flexShrink: '1', gap: 'var(--spacing-2)', height: '34px', maxWidth: '480px', paddingInline: 'var(--spacing-3)' }}>
              <svg width="14" height="14" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
                <circle cx="7" cy="7" r="5" fill="none" stroke="#FFFFFF40" strokeWidth="1.5" />
                <path d="M11 11l2.5 2.5" fill="none" stroke="#FFFFFF40" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <div style={{ boxSizing: 'border-box', color: 'var(--color-text-subtle)', display: 'inline-block', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-sm)', textWrap: 'initial', whiteSpaceCollapse: 'preserve' }}>
                Search tracks, artists, albums…
              </div>
            </div>
            <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: 'var(--spacing-3)' }}>
              <div style={{ alignItems: 'center', backgroundColor: 'var(--color-well)', backgroundImage: 'url(https://app.paper.design/file-assets/01KVEA9ZH9NC4H1JMS4CAP1VCP/01M1PH3RGEN44KWSP14GQYMARR.png)', backgroundPosition: '50%', backgroundSize: 'cover', borderRadius: 'var(--radius-full)', boxSizing: 'border-box', display: 'flex', gap: 0, height: '24px', justifyContent: 'center', paddingBlock: 'var(--spacing-1)', paddingInline: 'var(--spacing-2)', width: '25px' }} />
              <div style={{ boxSizing: 'border-box', color: 'var(--color-text)', display: 'inline-block', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-sm)', textWrap: 'initial', whiteSpaceCollapse: 'preserve' }}>
                Sofía Reyes
              </div>
            </div>
          </div>
          <div style={{ alignItems: 'start', boxSizing: 'border-box', display: 'flex', gap: '24px' }}>
            <div style={{ backgroundColor: 'var(--color-surface)', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', flexShrink: '0', gap: 'var(--spacing-0-5)', paddingBlock: 'var(--spacing-3)', width: '240px' }}>
              <div style={{ alignItems: 'center', backgroundColor: 'var(--color-accent-subtle)', borderRadius: 'var(--radius-md)', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: 'var(--spacing-3)', height: '36px', paddingInline: 'var(--spacing-3)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: '0' }}>
                  <path d="m11.485 2.143-8 4.8-2 1.2a1 1 0 001.03 1.714L3 9.567V20a2 2 0 002 2h5v-8h4v8h5a2 2 0 002-2V9.567l.485.29a1 1 0 001.03-1.714l-2-1.2-8-4.8a1 1 0 00-1.03 0Z" fill="#A89EA9" />
                </svg>
                <div style={{ boxSizing: 'border-box', color: 'var(--color-text)', display: 'inline-block', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-sm)', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 'var(--leading-sm)', textWrap: 'initial', whiteSpaceCollapse: 'preserve' }}>
                  Home
                </div>
              </div>
              <div style={{ alignItems: 'center', borderRadius: 'var(--radius-md)', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: 'var(--spacing-3)', height: '36px', paddingInline: 'var(--spacing-3)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: '0' }}>
                  <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1Zm0 2a9 9 0 110 18.001A9 9 0 0112 3Zm3.73 2.775L9.028 7.604a2 2 0 00-1.405 1.412l-1.811 6.76a2 2 0 002.458 2.448l6.701-1.828a2 2 0 001.406-1.412l1.812-6.761a2.001 2.001 0 00-2.459-2.448ZM9.555 9.533l6.702-1.828-1.812 6.762-6.702 1.826 1.812-6.76Zm1.238 2.143a1.25 1.25 0 102.415.647 1.25 1.25 0 00-2.415-.647Z" fill="rgb(240 237 232 / 55%)" />
                </svg>
                <div style={{ boxSizing: 'border-box', color: 'var(--color-text)', display: 'inline-block', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-sm)', letterSpacing: '-0.01em', lineHeight: 'var(--leading-sm)', textWrap: 'initial', whiteSpaceCollapse: 'preserve' }}>
                  Explore
                </div>
              </div>
              <div style={{ alignItems: 'center', borderRadius: 'var(--radius-md)', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: 'var(--spacing-3)', height: '36px', paddingInline: 'var(--spacing-3)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: '0' }}>
                  <path d="M19 2H5a2 2 0 00-2 2v16.887c0 1.266 1.382 2.048 2.469 1.399L12 18.366l6.531 3.919c1.087.652 2.469-.131 2.469-1.397V4a2 2 0 00-2-2ZM5 20.233V4h14v16.233l-6.485-3.89-.515-.309-.515.309L5 20.233Z" fill="rgb(240 237 232 / 55%)" />
                </svg>
                <div style={{ boxSizing: 'border-box', color: 'var(--color-text)', display: 'inline-block', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-sm)', letterSpacing: '-0.01em', lineHeight: 'var(--leading-sm)', textWrap: 'initial', whiteSpaceCollapse: 'preserve' }}>
                  Library
                </div>
              </div>
              <div style={{ boxSizing: 'border-box', display: 'inline-block', paddingBottom: 'var(--spacing-2)', paddingInline: 'var(--spacing-4)', paddingTop: 'var(--spacing-5)' }}>
                <div style={{ boxSizing: 'border-box', color: 'var(--color-text-subtle)', display: 'inline-block', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-sm)' }}>
                  Your lists
                </div>
              </div>
              <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: 'var(--spacing-3)', height: '44px', paddingInline: 'var(--spacing-4)' }}>
                <div style={{ alignItems: 'center', backgroundColor: 'var(--color-neutral-700)', borderRadius: 'var(--radius-md)', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '32px', justifyContent: 'center', width: '32px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" style={{ flexShrink: '0' }}>
                    <path d="M7 9.5C7 10.881 5.881 12 4.5 12C3.119 12 2 10.881 2 9.5C2 8.119 3.119 7 4.5 7C5.881 7 7 8.119 7 9.5ZM7 9.5V2C7.333 2.5 7.6 4.6 10 5" fill="none" stroke="rgb(255 255 255 / 90%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="10.5" cy="19.5" r="2.5" fill="none" stroke="rgb(255 255 255 / 90%)" strokeWidth="1.5" />
                    <circle cx="20" cy="18" r="2" fill="none" stroke="rgb(255 255 255 / 90%)" strokeWidth="1.5" />
                    <path d="M13 19.5L13 11C13 10.09 13 9.635 13.247 9.352C13.493 9.07 13.994 9.002 14.995 8.865C18.009 8.454 20.201 7.198 21.37 6.429C21.65 6.245 21.79 6.153 21.895 6.21C22 6.266 22 6.432 22 6.763V17.926" fill="none" stroke="rgb(255 255 255 / 90%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13 13C17.8 13 21 10.667 22 10" fill="none" stroke="rgb(255 255 255 / 90%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '1px', overflow: 'clip' }}>
                  <div style={{ boxSizing: 'border-box', color: 'var(--color-text)', display: '-webkit-box', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-sm)', letterSpacing: '-0.01em', lineHeight: 'var(--leading-sm)', overflow: 'hidden', textOverflow: 'ellipsis', WebkitBoxOrient: 'vertical', WebkitLineClamp: '1', whiteSpaceCollapse: 'preserve', width: 'fit-content' }}>
                    Liked Songs
                  </div>
                  <div style={{ boxSizing: 'border-box', color: 'var(--color-text-subtle)', display: 'inline-block', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-micro)', letterSpacing: '0.01em', lineHeight: 'var(--leading-micro)', textWrap: 'initial', whiteSpaceCollapse: 'preserve' }}>
                    Auto-generated
                  </div>
                </div>
              </div>
              <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: 'var(--spacing-3)', height: '40px', paddingInline: 'var(--spacing-4)' }}>
                <div style={{ backgroundImage: 'url(https://app.paper.design/file-assets/01KVEA9ZH9NC4H1JMS4CAP1VCP/01M1PH8P0NGEK32ZT15FRTQA5Z.png)', backgroundPosition: '50%', backgroundPositionX: 'center', backgroundPositionY: 'center', backgroundSize: 'cover', borderRadius: 'var(--radius-sm)', boxSizing: 'border-box', flexShrink: '0', height: '32px', width: '32px' }} />
                <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '1px', overflow: 'clip' }}>
                  <div style={{ boxSizing: 'border-box', color: 'var(--color-text)', display: '-webkit-box', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-sm)', letterSpacing: '-0.01em', lineHeight: 'var(--leading-sm)', overflow: 'hidden', textOverflow: 'ellipsis', WebkitBoxOrient: 'vertical', WebkitLineClamp: '1', whiteSpaceCollapse: 'preserve', width: 'fit-content' }}>
                    Vinyl Sundays
                  </div>
                  <div style={{ boxSizing: 'border-box', color: 'var(--color-text-subtle)', display: 'inline-block', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-micro)', letterSpacing: '0.01em', lineHeight: 'var(--leading-micro)', textWrap: 'initial', whiteSpaceCollapse: 'preserve' }}>
                    Sofía Reyes
                  </div>
                </div>
              </div>
              <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: 'var(--spacing-3)', height: '40px', paddingInline: 'var(--spacing-4)' }}>
                <div style={{ backgroundImage: 'url(https://app.paper.design/file-assets/01KVEA9ZH9NC4H1JMS4CAP1VCP/01M1PGXS7X3T1G1AAJFKQQ22XX.png)', backgroundPosition: '50%', backgroundPositionX: 'center', backgroundPositionY: 'center', backgroundSize: 'cover', borderRadius: 'var(--radius-sm)', boxSizing: 'border-box', flexShrink: '0', height: '32px', width: '32px' }} />
                <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '1px', overflow: 'clip' }}>
                  <div style={{ boxSizing: 'border-box', color: 'var(--color-text)', display: '-webkit-box', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-sm)', letterSpacing: '-0.01em', lineHeight: 'var(--leading-sm)', overflow: 'hidden', textOverflow: 'ellipsis', WebkitBoxOrient: 'vertical', WebkitLineClamp: '1', whiteSpaceCollapse: 'preserve', width: 'fit-content' }}>
                    Late Night Heat
                  </div>
                  <div style={{ boxSizing: 'border-box', color: 'var(--color-text-subtle)', display: 'inline-block', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-micro)', letterSpacing: '0.01em', lineHeight: 'var(--leading-micro)', textWrap: 'initial', whiteSpaceCollapse: 'preserve' }}>
                    Amara Diallo
                  </div>
                </div>
              </div>
            </div>
            <div style={{ boxSizing: 'border-box', display: 'inline-block', flexShrink: '0', paddingTop: 'var(--spacing-3)', width: '360px' }}>
              <div style={{ boxSizing: 'border-box', color: 'var(--color-text-muted)', display: 'inline-block', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-sm)' }}>
                Sidebar nav is three items, sentence case. The current item sits on accent-subtle. Below it, the lists you follow and the ones you made, each with its curator's name. No section is ever in caps.
              </div>
            </div>
          </div>
          <div style={{ alignItems: 'center', backgroundColor: 'var(--color-surface)', borderTopColor: 'var(--color-line-subtle)', borderTopStyle: 'solid', borderTopWidth: '1px', boxSizing: 'border-box', display: 'flex', gap: 0, height: 'fit-content', justifyContent: 'space-between', padding: '24px', width: '1232px' }}>
            <div style={{ alignItems: 'start', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: 'var(--spacing-2)', height: 'fit-content', justifyContent: 'space-between', width: 'fit-content' }}>
              <div style={{ backgroundImage: 'url(https://app.paper.design/file-assets/01KVEA9ZH9NC4H1JMS4CAP1VCP/0FJ88KSJVYDMW3EPNSMJ9PDNE0.png)', backgroundPosition: '50%', backgroundPositionX: 'center', backgroundPositionY: 'center', backgroundSize: 'cover', borderRadius: 'var(--radius-sm)', boxSizing: 'border-box', flexShrink: '0', height: '34px', width: '34px' }} />
              <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexDirection: 'column', flexGrow: '1', flexShrink: '1', minWidth: '0px', width: 'fit-content' }}>
                <div style={{ boxSizing: 'border-box', color: 'var(--color-text)', display: '-webkit-box', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-base)', fontWeight: 600, lineHeight: 'var(--leading-base)', overflow: 'hidden', textOverflow: 'ellipsis', WebkitBoxOrient: 'vertical', WebkitLineClamp: '1', whiteSpaceCollapse: 'preserve', width: 'fit-content' }}>
                  Harbour Lights
                </div>
                <div style={{ boxSizing: 'border-box', color: 'var(--color-text-muted)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-xs)', height: 'fit-content', lineHeight: 'var(--leading-xs)', whiteSpaceCollapse: 'preserve', width: 'max-content' }}>
                  Jack Hatfield
                </div>
              </div>
            </div>
            <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: 'var(--spacing-6)', height: 'fit-content', width: 'fit-content' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ display: 'block', flexShrink: '0' }}>
                <path d="M19.558 4L20.455 4.976C20.856 5.412 21.057 5.63 20.986 5.815C20.916 6 20.632 6 20.065 6C18.796 6 17.277 5.795 16.111 6.473C15.39 6.893 14.888 7.625 14.039 9M3 18H4.581C6.509 18 7.473 18 8.286 17.527C9.007 17.107 9.509 16.375 10.358 15" fill="none" stroke="#A89EA9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19.558 20L20.455 19.024C20.856 18.588 21.057 18.37 20.986 18.185C20.916 18 20.632 18 20.065 18C18.796 18 17.277 18.205 16.111 17.527C15.298 17.053 14.763 16.181 13.694 14.438L10.704 9.562C9.634 7.819 9.1 6.947 8.286 6.473C7.473 6 6.509 6 4.581 6H3" fill="none" stroke="#A89EA9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ display: 'block', flexShrink: '0' }}>
                <path d="M8.065 12.626C8.319 13.837 9.673 14.708 12.38 16.448C15.325 18.341 16.797 19.288 17.989 18.923C18.393 18.799 18.765 18.582 19.078 18.288C20 17.418 20 15.612 20 12C20 8.388 20 6.582 19.078 5.712C18.765 5.418 18.393 5.201 17.989 5.077C16.797 4.712 15.325 5.659 12.38 7.552C9.673 9.292 8.319 10.163 8.065 11.374C7.978 11.787 7.978 12.213 8.065 12.626Z" fill="none" stroke="#A89EA9" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M4 4L4 20" fill="none" stroke="#A89EA9" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <div style={{ alignItems: 'center', backgroundColor: 'var(--color-bg-inverse)', borderRadius: 'var(--radius-full)', boxSizing: 'border-box', display: 'flex', gap: 0, height: 'fit-content', padding: '8px', width: 'fit-content' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ display: 'block', flexShrink: '0' }}>
                  <path d="M4 7C4 5.586 4 4.879 4.439 4.439C4.879 4 5.586 4 7 4C8.414 4 9.121 4 9.561 4.439C10 4.879 10 5.586 10 7V17C10 18.414 10 19.121 9.561 19.561C9.121 20 8.414 20 7 20C5.586 20 4.879 20 4.439 19.561C4 19.121 4 18.414 4 17V7Z" fill="none" stroke="#000000" strokeWidth="1.5" />
                  <path d="M14 7C14 5.586 14 4.879 14.439 4.439C14.879 4 15.586 4 17 4C18.414 4 19.121 4 19.561 4.439C20 4.879 20 5.586 20 7V17C20 18.414 20 19.121 19.561 19.561C19.121 20 18.414 20 17 20C15.586 20 14.879 20 14.439 19.561C14 19.121 14 18.414 14 17V7Z" fill="none" stroke="#000000" strokeWidth="1.5" />
                </svg>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ display: 'block', flexShrink: '0' }}>
                <path d="M15.935 12.626C15.681 13.837 14.327 14.708 11.62 16.448C8.675 18.341 7.203 19.288 6.011 18.923C5.607 18.799 5.235 18.582 4.922 18.288C4 17.418 4 15.612 4 12C4 8.388 4 6.582 4.922 5.712C5.235 5.418 5.607 5.201 6.011 5.077C7.203 4.712 8.675 5.659 11.62 7.552C14.327 9.292 15.681 10.163 15.935 11.374C16.022 11.787 16.022 12.213 15.935 12.626Z" fill="none" stroke="#A89EA9" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M20 5V19" fill="none" stroke="#A89EA9" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ display: 'block', flexShrink: '0' }}>
                <path d="M16.388 3L17.391 3.976C17.839 4.412 18.063 4.63 17.984 4.815C17.906 5 17.589 5 16.955 5H9.194C5.221 5 2 8.134 2 12C2 13.487 2.477 14.866 3.289 16" fill="none" stroke="#A89EA9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.612 21L6.609 20.024C6.161 19.588 5.937 19.37 6.016 19.185C6.094 19 6.411 19 7.045 19H14.806C18.779 19 22 15.866 22 12C22 10.513 21.523 9.134 20.71 8" fill="none" stroke="#A89EA9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: 'var(--spacing-3)', height: 'fit-content', paddingRight: 'var(--spacing-6)', width: 'fit-content' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ display: 'block', flexShrink: '0' }}>
                <path d="M14 14.813V9.186C14 6.041 14 4.469 13.075 4.077C12.149 3.686 11.06 4.798 8.882 7.022C7.754 8.174 7.111 8.429 5.506 8.429C4.103 8.429 3.401 8.429 2.897 8.773C1.85 9.487 2.009 10.882 2.009 12C2.009 13.118 1.85 14.513 2.897 15.227C3.401 15.571 4.103 15.571 5.506 15.571C7.111 15.571 7.754 15.826 8.882 16.978C11.06 19.202 12.149 20.314 13.075 19.923C14 19.531 14 17.959 14 14.813Z" fill="none" stroke="#A89EA9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17 9C17.625 9.82 18 10.863 18 12C18 13.137 17.625 14.18 17 15" fill="none" stroke="#A89EA9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 7C21.251 8.366 22 10.106 22 12C22 13.894 21.251 15.634 20 17" fill="none" stroke="#A89EA9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div style={{ alignItems: 'start', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: 'var(--spacing-6)', height: 'fit-content', position: 'relative', width: '124px' }}>
                <div style={{ backgroundColor: 'var(--color-neutral-700)', borderRadius: 'var(--radius-full)', boxSizing: 'border-box', height: '4px', opacity: '1', width: '100%' }} />
                <div style={{ backgroundColor: 'var(--color-neutral-400)', borderRadius: 'var(--radius-full)', boxSizing: 'border-box', height: '4px', left: 0, position: 'absolute', top: 0, width: '100px' }} />
              </div>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: 'var(--color-bg-light)', borderColor: 'var(--color-line-light)', borderRadius: 'var(--radius-lg)', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px', width: '1280px' }}>
          <div style={{ alignItems: 'center', backgroundColor: 'var(--color-surface-light)', borderBottomColor: 'var(--color-line-subtle-light)', borderBottomStyle: 'solid', borderBottomWidth: '1px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '52px', justifyContent: 'space-between', paddingLeft: 'var(--spacing-4)', paddingRight: 'var(--spacing-5)' }}>
            <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: 'var(--spacing-6)', paddingInline: 'var(--spacing-0-5)' }}>
              <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '6px', height: 'fit-content', width: 'fit-content' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px', flexShrink: '0' }}>
                  <path d="M0 0H5V16H0ZM5 5H11V11H5ZM11 0H16V5H11ZM11 11H16V16H11Z" fill="var(--color-text-light)" />
                </svg>
                <div style={{ boxSizing: 'border-box', color: 'var(--color-text-light)', display: 'inline-block', fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-display-medium)', lineHeight: 'var(--leading-lg)', textWrap: 'initial', whiteSpaceCollapse: 'preserve' }}>
                  Kraft
                </div>
              </div>
              <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: 'var(--spacing-1)' }}>
                <div style={{ alignItems: 'center', backgroundColor: 'var(--color-hover-light)', borderRadius: 'var(--radius-md)', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '28px', justifyContent: 'center', width: '28px' }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
                    <path d="M10 3L5 8L10 13" fill="none" stroke="var(--color-text-muted-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div style={{ alignItems: 'center', backgroundColor: 'var(--color-hover-light)', borderRadius: 'var(--radius-md)', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '28px', justifyContent: 'center', width: '28px' }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
                    <path d="M6 3L11 8L6 13" fill="none" stroke="var(--color-text-muted-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
            <div style={{ alignItems: 'center', backgroundColor: 'var(--color-well-light)', borderColor: 'var(--color-line-strong-light)', borderRadius: 'var(--radius-md)', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexGrow: '1', flexShrink: '1', gap: 'var(--spacing-2)', height: '34px', maxWidth: '480px', paddingInline: 'var(--spacing-3)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
                <circle cx="11" cy="11" r="7" fill="none" stroke="var(--color-text-subtle-light)" strokeWidth="2" />
                <path d="M16.5 16.5L21 21" fill="none" stroke="var(--color-text-subtle-light)" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div style={{ boxSizing: 'border-box', color: 'var(--color-text-subtle-light)', display: 'inline-block', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-sm)', textWrap: 'initial', whiteSpaceCollapse: 'preserve' }}>
                Search tracks, artists, albums…
              </div>
            </div>
            <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: 'var(--spacing-3)' }}>
              <div style={{ alignItems: 'center', backgroundColor: 'var(--color-well-light)', backgroundImage: 'url(https://app.paper.design/file-assets/01KVEA9ZH9NC4H1JMS4CAP1VCP/01M1PH3RGEN44KWSP14GQYMARR.png)', backgroundPosition: '50%', backgroundSize: 'cover', borderRadius: 'var(--radius-full)', boxSizing: 'border-box', display: 'flex', gap: 0, height: '24px', justifyContent: 'center', paddingBlock: 'var(--spacing-1)', paddingInline: 'var(--spacing-2)', width: '25px' }} />
              <div style={{ boxSizing: 'border-box', color: 'var(--color-text-light)', display: 'inline-block', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-sm)', textWrap: 'initial', whiteSpaceCollapse: 'preserve' }}>
                Sofía Reyes
              </div>
            </div>
          </div>
          <div style={{ alignItems: 'start', boxSizing: 'border-box', display: 'flex', gap: '24px' }}>
            <div style={{ backgroundColor: 'var(--color-surface-light)', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', flexShrink: '0', gap: 'var(--spacing-0-5)', paddingBlock: 'var(--spacing-3)', width: '240px' }}>
              <div style={{ alignItems: 'center', backgroundColor: 'var(--color-accent-subtle-light)', borderRadius: 'var(--radius-md)', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: 'var(--spacing-3)', height: '36px', paddingInline: 'var(--spacing-3)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
                  <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10.5Z" fill="none" stroke="var(--color-text-light)" strokeWidth="1.75" strokeLinejoin="round" />
                </svg>
                <div style={{ boxSizing: 'border-box', color: 'var(--color-text-light)', display: 'inline-block', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-sm)', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 'var(--leading-sm)', textWrap: 'initial', whiteSpaceCollapse: 'preserve' }}>
                  Home
                </div>
              </div>
              <div style={{ alignItems: 'center', borderRadius: 'var(--radius-md)', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: 'var(--spacing-3)', height: '36px', paddingInline: 'var(--spacing-3)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
                  <circle cx="12" cy="12" r="9" fill="none" stroke="var(--color-text-light)" strokeWidth="1.75" />
                  <path d="M15.5 8.5l-2.2 5-5 2.2 2.2-5z" fill="none" stroke="var(--color-text-light)" strokeWidth="1.75" strokeLinejoin="round" />
                </svg>
                <div style={{ boxSizing: 'border-box', color: 'var(--color-text-light)', display: 'inline-block', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-sm)', letterSpacing: '-0.01em', lineHeight: 'var(--leading-sm)', textWrap: 'initial', whiteSpaceCollapse: 'preserve' }}>
                  Explore
                </div>
              </div>
              <div style={{ alignItems: 'center', borderRadius: 'var(--radius-md)', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: 'var(--spacing-3)', height: '36px', paddingInline: 'var(--spacing-3)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
                  <path d="M6 3h12v18l-6-4-6 4V3Z" fill="none" stroke="var(--color-text-light)" strokeWidth="1.75" strokeLinejoin="round" />
                </svg>
                <div style={{ boxSizing: 'border-box', color: 'var(--color-text-light)', display: 'inline-block', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-sm)', letterSpacing: '-0.01em', lineHeight: 'var(--leading-sm)', textWrap: 'initial', whiteSpaceCollapse: 'preserve' }}>
                  Library
                </div>
              </div>
              <div style={{ boxSizing: 'border-box', display: 'inline-block', paddingBottom: 'var(--spacing-2)', paddingInline: 'var(--spacing-4)', paddingTop: 'var(--spacing-5)' }}>
                <div style={{ boxSizing: 'border-box', color: 'var(--color-text-subtle-light)', display: 'inline-block', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-sm)' }}>
                  Your lists
                </div>
              </div>
              <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: 'var(--spacing-3)', height: '44px', paddingInline: 'var(--spacing-4)' }}>
                <div style={{ alignItems: 'center', backgroundColor: 'var(--color-neutral-300)', borderRadius: 'var(--radius-md)', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '32px', justifyContent: 'center', width: '32px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
                    <path d="M9 18V5l12-2v13" fill="none" stroke="var(--color-text-light)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="6" cy="18" r="3" fill="none" stroke="var(--color-text-light)" strokeWidth="1.75" />
                    <circle cx="18" cy="16" r="3" fill="none" stroke="var(--color-text-light)" strokeWidth="1.75" />
                  </svg>
                </div>
                <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '1px', overflow: 'clip' }}>
                  <div style={{ boxSizing: 'border-box', color: 'var(--color-text-light)', display: '-webkit-box', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-sm)', letterSpacing: '-0.01em', lineHeight: 'var(--leading-sm)', overflow: 'hidden', textOverflow: 'ellipsis', WebkitBoxOrient: 'vertical', WebkitLineClamp: '1', whiteSpaceCollapse: 'preserve', width: 'fit-content' }}>
                    Liked Songs
                  </div>
                  <div style={{ boxSizing: 'border-box', color: 'var(--color-text-subtle-light)', display: 'inline-block', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-micro)', letterSpacing: '0.01em', lineHeight: 'var(--leading-micro)', textWrap: 'initial', whiteSpaceCollapse: 'preserve' }}>
                    Auto-generated
                  </div>
                </div>
              </div>
              <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: 'var(--spacing-3)', height: '40px', paddingInline: 'var(--spacing-4)' }}>
                <div style={{ backgroundImage: 'url(https://app.paper.design/file-assets/01KVEA9ZH9NC4H1JMS4CAP1VCP/01M1PH8P0NGEK32ZT15FRTQA5Z.png)', backgroundPosition: '50%', backgroundPositionX: 'center', backgroundPositionY: 'center', backgroundSize: 'cover', borderRadius: 'var(--radius-sm)', boxSizing: 'border-box', flexShrink: '0', height: '32px', width: '32px' }} />
                <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '1px', overflow: 'clip' }}>
                  <div style={{ boxSizing: 'border-box', color: 'var(--color-text-light)', display: '-webkit-box', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-sm)', letterSpacing: '-0.01em', lineHeight: 'var(--leading-sm)', overflow: 'hidden', textOverflow: 'ellipsis', WebkitBoxOrient: 'vertical', WebkitLineClamp: '1', whiteSpaceCollapse: 'preserve', width: 'fit-content' }}>
                    Vinyl Sundays
                  </div>
                  <div style={{ boxSizing: 'border-box', color: 'var(--color-text-subtle-light)', display: 'inline-block', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-micro)', letterSpacing: '0.01em', lineHeight: 'var(--leading-micro)', textWrap: 'initial', whiteSpaceCollapse: 'preserve' }}>
                    Sofía Reyes
                  </div>
                </div>
              </div>
              <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: 'var(--spacing-3)', height: '40px', paddingInline: 'var(--spacing-4)' }}>
                <div style={{ backgroundImage: 'url(https://app.paper.design/file-assets/01KVEA9ZH9NC4H1JMS4CAP1VCP/01M1PGXS7X3T1G1AAJFKQQ22XX.png)', backgroundPosition: '50%', backgroundPositionX: 'center', backgroundPositionY: 'center', backgroundSize: 'cover', borderRadius: 'var(--radius-sm)', boxSizing: 'border-box', flexShrink: '0', height: '32px', width: '32px' }} />
                <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '1px', overflow: 'clip' }}>
                  <div style={{ boxSizing: 'border-box', color: 'var(--color-text-light)', display: '-webkit-box', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-sm)', letterSpacing: '-0.01em', lineHeight: 'var(--leading-sm)', overflow: 'hidden', textOverflow: 'ellipsis', WebkitBoxOrient: 'vertical', WebkitLineClamp: '1', whiteSpaceCollapse: 'preserve', width: 'fit-content' }}>
                    Late Night Heat
                  </div>
                  <div style={{ boxSizing: 'border-box', color: 'var(--color-text-subtle-light)', display: 'inline-block', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-micro)', letterSpacing: '0.01em', lineHeight: 'var(--leading-micro)', textWrap: 'initial', whiteSpaceCollapse: 'preserve' }}>
                    Amara Diallo
                  </div>
                </div>
              </div>
            </div>
            <div style={{ boxSizing: 'border-box', display: 'inline-block', flexShrink: '0', paddingTop: 'var(--spacing-3)', width: '360px' }}>
              <div style={{ boxSizing: 'border-box', color: 'var(--color-text-muted-light)', display: 'inline-block', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-sm)' }}>
                Sidebar nav is three items, sentence case. The current item sits on accent-subtle. Below it, the lists you follow and the ones you made, each with its curator's name. No section is ever in caps.
              </div>
            </div>
          </div>
          <div style={{ alignItems: 'center', backgroundColor: 'var(--color-surface-light)', borderTopColor: 'var(--color-line-subtle-light)', borderTopStyle: 'solid', borderTopWidth: '1px', boxSizing: 'border-box', display: 'flex', gap: 0, height: 'fit-content', justifyContent: 'space-between', padding: '24px', width: '1232px' }}>
            <div style={{ alignItems: 'start', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: 'var(--spacing-2)', height: 'fit-content', justifyContent: 'space-between', width: 'fit-content' }}>
              <div style={{ backgroundImage: 'url(https://app.paper.design/file-assets/01KVEA9ZH9NC4H1JMS4CAP1VCP/0FJ88KSJVYDMW3EPNSMJ9PDNE0.png)', backgroundPosition: '50%', backgroundPositionX: 'center', backgroundPositionY: 'center', backgroundSize: 'cover', borderRadius: 'var(--radius-sm)', boxSizing: 'border-box', flexShrink: '0', height: '34px', width: '34px' }} />
              <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexDirection: 'column', flexGrow: '1', flexShrink: '1', minWidth: '0px', width: 'fit-content' }}>
                <div style={{ boxSizing: 'border-box', color: 'var(--color-text-light)', display: '-webkit-box', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-base)', fontWeight: 600, lineHeight: 'var(--leading-base)', overflow: 'hidden', textOverflow: 'ellipsis', WebkitBoxOrient: 'vertical', WebkitLineClamp: '1', whiteSpaceCollapse: 'preserve', width: 'fit-content' }}>
                  Harbour Lights
                </div>
                <div style={{ boxSizing: 'border-box', color: 'var(--color-text-muted-light)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-xs)', height: 'fit-content', lineHeight: 'var(--leading-xs)', whiteSpaceCollapse: 'preserve', width: 'max-content' }}>
                  Jack Hatfield
                </div>
              </div>
            </div>
            <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: 'var(--spacing-6)', height: 'fit-content', width: 'fit-content' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
                <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" fill="none" stroke="var(--color-text-muted-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
                <path d="M19 5v14L8 12l11-7Z" fill="none" stroke="var(--color-text-light)" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M5 5v14" fill="none" stroke="var(--color-text-light)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <div style={{ alignItems: 'center', backgroundColor: 'var(--color-bg-inverse-light)', borderRadius: 'var(--radius-full)', boxSizing: 'border-box', display: 'flex', gap: 0, height: 'fit-content', padding: '8px', width: 'fit-content' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
                  <rect x="6" y="4" width="4" height="16" rx="1" fill="var(--color-text-inverse-light)" />
                  <rect x="14" y="4" width="4" height="16" rx="1" fill="var(--color-text-inverse-light)" />
                </svg>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
                <path d="M5 5v14l11-7L5 5Z" fill="none" stroke="var(--color-text-light)" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M19 5v14" fill="none" stroke="var(--color-text-light)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
                <path d="M17 2l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3" fill="none" stroke="var(--color-text-muted-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: 'var(--spacing-3)', height: 'fit-content', paddingRight: 'var(--spacing-6)', width: 'fit-content' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
                <path d="M11 5 6 9H2v6h4l5 4V5Z" fill="none" stroke="var(--color-text-muted-light)" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" fill="none" stroke="var(--color-text-muted-light)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <div style={{ alignItems: 'start', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: 'var(--spacing-6)', height: 'fit-content', position: 'relative', width: '124px' }}>
                <div style={{ backgroundColor: 'var(--color-neutral-300)', borderRadius: 'var(--radius-full)', boxSizing: 'border-box', height: '4px', opacity: '1', width: '100%' }} />
                <div style={{ backgroundColor: 'var(--color-neutral-600)', borderRadius: 'var(--radius-full)', boxSizing: 'border-box', height: '4px', left: 0, position: 'absolute', top: 0, width: '100px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
