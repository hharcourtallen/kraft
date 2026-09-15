import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/tokens.css'
import './styles/base.css'
import { ThemeProvider } from './lib/theme.jsx'
import { PlayerProvider } from './lib/player.jsx'
import { SocialProvider } from './lib/social.jsx'
import Shell from './components/Shell.jsx'
import Home from './pages/Home.jsx'
import Explore from './pages/Explore.jsx'
import Library from './pages/Library.jsx'
import List from './pages/List.jsx'
import Curator from './pages/Curator.jsx'
import Artist from './pages/Artist.jsx'
import NowPlaying from './pages/NowPlaying.jsx'
import Welcome from './pages/Welcome.jsx'
import Countries from './pages/Countries.jsx'
import Settings from './pages/Settings.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <SocialProvider>
        <PlayerProvider>
          <BrowserRouter>
            <Routes>
              <Route path="welcome" element={<Welcome />} />
              <Route element={<Shell />}>
                <Route index element={<Home />} />
                <Route path="explore" element={<Explore />} />
                <Route path="library" element={<Library />} />
                <Route path="lists/:slug" element={<List />} />
                <Route path="curators/:slug" element={<Curator />} />
                <Route path="artists/:slug" element={<Artist />} />
                <Route path="now-playing" element={<NowPlaying />} />
                <Route path="countries" element={<Countries />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </PlayerProvider>
      </SocialProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
