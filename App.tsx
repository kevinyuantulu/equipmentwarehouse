import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Environment, ContactShadows, Stars } from '@react-three/drei';
import { EQUIPMENT_DATA } from './constants';
import { Equipment, EquipmentType } from './types';
import { FoilModel, EpeeModel, SabreModel, MaskModel } from './components/EquipmentModels';
import { getEquipmentInsight } from './services/geminiService';
import { Info, Box, Search, X, ChevronRight, Activity } from 'lucide-react';

const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(EQUIPMENT_DATA[0].id);
  const [aiInsight, setAiInsight] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState<boolean>(false);
  const [showAiPanel, setShowAiPanel] = useState<boolean>(false);

  const selectedEquipment = EQUIPMENT_DATA.find(e => e.id === selectedId) || EQUIPMENT_DATA[0];

  const handleEquipmentChange = (id: string) => {
    setSelectedId(id);
    setAiInsight('');
    setShowAiPanel(false);
  };

  const handleAskAI = async () => {
    setLoadingAi(true);
    setShowAiPanel(true);
    const insight = await getEquipmentInsight(selectedEquipment, "Tell me about the strategic advantages and history of this weapon.");
    setAiInsight(insight);
    setLoadingAi(false);
  };

  return (
    <div className="relative w-full h-screen bg-slate-900 text-white overflow-hidden flex flex-col md:flex-row">
      
      {/* Sidebar / Equipment List */}
      <aside className="w-full md:w-80 bg-slate-950/80 border-b md:border-b-0 md:border-r border-slate-800 z-20 flex flex-col backdrop-blur-md h-[30vh] md:h-full">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold font-tech tracking-wider text-blue-400 flex items-center gap-2">
            <Activity className="w-6 h-6" /> EN GARDE ARMORY
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-tech">VIRTUAL WAREHOUSE v2.5</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {EQUIPMENT_DATA.map((item) => (
            <button
              key={item.id}
              onClick={() => handleEquipmentChange(item.id)}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-300 group ${
                selectedId === item.id
                  ? 'bg-blue-900/30 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-600 hover:bg-slate-800'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className={`font-bold font-tech ${selectedId === item.id ? 'text-blue-300' : 'text-slate-300'}`}>
                  {item.name}
                </span>
                {selectedId === item.id && <ChevronRight className="w-4 h-4 text-blue-400" />}
              </div>
              <div className="text-xs text-slate-500 mt-1 font-mono uppercase">{item.type}</div>
            </button>
          ))}
        </div>
      </aside>

      {/* Main 3D Viewport */}
      <main className="flex-1 relative h-[70vh] md:h-full bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="absolute top-4 left-4 md:left-8 z-10">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
             <Box className="w-3 h-3" /> 3D INTERACTIVE VIEW
           </div>
        </div>

        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 15], fov: 45 }}>
          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Stage environment="city" intensity={0.5} contactShadow={false}>
              {selectedEquipment.type === EquipmentType.FOIL && <FoilModel isRotating={!showAiPanel} />}
              {selectedEquipment.type === EquipmentType.EPEE && <EpeeModel isRotating={!showAiPanel} />}
              {selectedEquipment.type === EquipmentType.SABRE && <SabreModel isRotating={!showAiPanel} />}
              {selectedEquipment.type === EquipmentType.MASK && <MaskModel isRotating={!showAiPanel} />}
            </Stage>
            <Environment preset="warehouse" />
            <OrbitControls autoRotate={!showAiPanel} autoRotateSpeed={0.8} makeDefault />
          </Suspense>
        </Canvas>
      </main>

      {/* Right Details Panel (Overlay) */}
      <div className="absolute top-4 right-4 md:bottom-8 md:top-auto md:right-8 w-auto max-w-md z-10 flex flex-col items-end pointer-events-none">
        {/* Main Info Card */}
        <div className="bg-slate-950/90 border border-slate-700 p-6 rounded-xl shadow-2xl backdrop-blur-lg pointer-events-auto mb-4 w-full">
          <div className="flex justify-between items-start mb-4">
            <div>
               <h2 className="text-3xl font-bold font-tech text-white">{selectedEquipment.name}</h2>
               <span className="inline-block px-2 py-0.5 bg-slate-800 rounded text-xs text-slate-400 mt-1 font-mono border border-slate-700">
                  CLASS: {selectedEquipment.type}
               </span>
            </div>
            <button 
              onClick={() => setShowAiPanel(!showAiPanel)}
              className="p-2 rounded-full hover:bg-slate-800 transition-colors text-slate-400 hover:text-blue-400"
              title="Toggle Info"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-slate-300 text-sm leading-relaxed mb-6 border-l-2 border-blue-500 pl-3">
            {selectedEquipment.shortDescription}
          </p>

          <div className="grid grid-cols-3 gap-2 mb-6">
            <div className="bg-slate-900/50 p-2 rounded border border-slate-800 text-center">
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">WEIGHT</div>
              <div className="text-blue-300 font-mono text-sm">{selectedEquipment.baseStats.weight}</div>
            </div>
            <div className="bg-slate-900/50 p-2 rounded border border-slate-800 text-center">
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">FLEX</div>
              <div className="text-blue-300 font-mono text-sm">{selectedEquipment.baseStats.flexibility}</div>
            </div>
            <div className="bg-slate-900/50 p-2 rounded border border-slate-800 text-center">
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">TARGET</div>
              <div className="text-blue-300 font-mono text-sm leading-tight pt-1">{selectedEquipment.baseStats.targetArea}</div>
            </div>
          </div>

          <button
            onClick={handleAskAI}
            disabled={loadingAi && showAiPanel}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 active:transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loadingAi ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                ACCESSING ARMORY DATABASE...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                ASK ARMORER AI FOR DETAILS
              </>
            )}
          </button>
        </div>

        {/* AI Insight Popup */}
        {showAiPanel && aiInsight && !loadingAi && (
           <div className="bg-slate-900/95 border border-blue-500/30 p-5 rounded-xl shadow-2xl backdrop-blur-xl pointer-events-auto w-full animate-in slide-in-from-bottom-4 fade-in duration-300 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-500"></div>
             <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-blue-400 flex items-center gap-2 font-tech">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  AI ANALYSIS
                </h3>
                <button onClick={() => setShowAiPanel(false)} className="text-slate-500 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
             </div>
             <div className="prose prose-invert prose-sm max-h-40 overflow-y-auto pr-2">
               <p className="text-slate-200 text-xs leading-relaxed whitespace-pre-line font-mono">
                 {aiInsight}
               </p>
             </div>
           </div>
        )}
      </div>
      
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-0"></div>
    </div>
  );
};

export default App;
