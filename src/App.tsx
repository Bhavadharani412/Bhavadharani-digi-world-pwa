/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Shell from './components/layout/Shell';
import Dashboard from './pages/Dashboard';
import Execute from './pages/Execute';
import Grow from './pages/Grow';
import Reflect from './pages/Reflect';
import Vault from './pages/Vault';
import MoodFlow from './pages/MoodFlow';

export default function App() {
  return (
    <Router>
      <Shell>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/execute" element={<Execute />} />
          <Route path="/grow" element={<Grow />} />
          <Route path="/reflect" element={<Reflect />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/mood" element={<MoodFlow />} />
        </Routes>
      </Shell>
    </Router>
  );
}
