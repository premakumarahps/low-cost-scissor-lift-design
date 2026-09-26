import React, { useState } from 'react';
import { REPORT_PAGES, type ReportPageData } from '../core/scissorLiftData';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Maximize2, 
  Minimize2, 
  Layers, 
  Search,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const ReportReader: React.FC = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [selectedChapter, setSelectedChapter] = useState<string>('All');
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'reader' | 'grid'>('reader');

  const chapters = [
    'All',
    'Title & Cover',
    'Table of Contents',
    '1. Introduction',
    '2. Market Survey',
    '3. Customer Requirements',
    '4. Proposed Designs',
    '5. Best Design Selection',
    '6. Best Final Design',
    '7. Designing Calculations',
    '8. Cost Analysis',
    '9. SWOT Analysis & Refs',
    '10. References',
    'Annexes'
  ];

  const filteredPages = selectedChapter === 'All' 
    ? REPORT_PAGES 
    : REPORT_PAGES.filter(p => p.chapter.toLowerCase().includes(selectedChapter.toLowerCase()));

  const currentPage: ReportPageData = REPORT_PAGES[currentPageIndex] || REPORT_PAGES[0];

  const goToNextPage = () => {
    if (currentPageIndex < REPORT_PAGES.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 backdrop-blur-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-medium mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            ME2851 THA1 • 37-PAGE TECHNICAL REPORT
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight font-heading">
            Design & Analysis Report Reader
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Complete project submission by <span className="text-amber-400 font-semibold">Premakumara H.P.S. (210494D)</span> • Dept. of Mechanical Engineering, UoM
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center">
            <button
              onClick={() => setViewMode('reader')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'reader'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Reader View
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Grid View (37 Pgs)
            </button>
          </div>

          <a
            href="/docs/ME2851_Scissor_Lift_Report_210494D.pdf"
            download="ME2851_Scissor_Lift_Report_210494D.pdf"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            Download PDF (1.3 MB)
          </a>
        </div>
      </div>

      {/* Chapter Pills Carousel */}
      <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
        <div className="flex items-center gap-2 min-w-max">
          {chapters.map(ch => (
            <button
              key={ch}
              onClick={() => {
                setSelectedChapter(ch);
                const firstMatch = REPORT_PAGES.findIndex(p => ch === 'All' || p.chapter.toLowerCase().includes(ch.toLowerCase()));
                if (firstMatch !== -1) setCurrentPageIndex(firstMatch);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                selectedChapter === ch
                  ? 'bg-amber-500/20 border border-amber-500 text-amber-300 font-semibold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {ch}
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'reader' ? (
        /* READER FLIPBOOK VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Document Viewer Canvas */}
          <div className="lg:col-span-8 bg-slate-900/90 rounded-2xl border border-slate-800 p-4 lg:p-6 shadow-2xl relative">
            {/* Viewer Toolbar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-amber-400 font-bold text-sm">
                  Page {currentPage.pageNumber} of {REPORT_PAGES.length}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 font-medium truncate max-w-[200px] sm:max-w-[320px]">
                  {currentPage.title}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                  title={isZoomed ? "Exit Fullscreen" : "Fullscreen View"}
                >
                  {isZoomed ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Document Image with Nav Arrows */}
            <div className="relative group bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center min-h-[500px] border border-slate-800/80">
              <img
                src={currentPage.image}
                alt={currentPage.title}
                className="max-h-[700px] w-auto object-contain transition-transform duration-200 select-none shadow-2xl"
                loading="eager"
              />

              {/* Prev Overlay Button */}
              {currentPageIndex > 0 && (
                <button
                  onClick={goToPrevPage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white backdrop-blur border border-slate-700 opacity-80 group-hover:opacity-100 transition-all hover:scale-110"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Next Overlay Button */}
              {currentPageIndex < REPORT_PAGES.length - 1 && (
                <button
                  onClick={goToNextPage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white backdrop-blur border border-slate-700 opacity-80 group-hover:opacity-100 transition-all hover:scale-110"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Slider / Scrubber */}
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={goToPrevPage}
                disabled={currentPageIndex === 0}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs text-white font-medium flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </button>

              <input
                type="range"
                min="0"
                max={REPORT_PAGES.length - 1}
                value={currentPageIndex}
                onChange={(e) => setCurrentPageIndex(parseInt(e.target.value))}
                className="flex-1 accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />

              <button
                onClick={goToNextPage}
                disabled={currentPageIndex === REPORT_PAGES.length - 1}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs text-white font-medium flex items-center gap-1"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Page Metadata & Quick Jump Thumbnails */}
          <div className="lg:col-span-4 space-y-6">
            {/* Page Info Card */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                {currentPage.chapter}
              </span>
              <h3 className="text-xl font-bold text-white mt-1 mb-3">
                {currentPage.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {currentPage.summary}
              </p>

              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Project Author:</span>
                  <span className="text-amber-400 font-medium">Premakumara H.P.S.</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Student Index:</span>
                  <span className="text-slate-200 font-mono">210494D</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Academic Module:</span>
                  <span className="text-slate-200 font-mono">ME2851 (Sem 4)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Institution:</span>
                  <span className="text-slate-200">University of Moratuwa</span>
                </div>
              </div>
            </div>

            {/* Thumbnail Filmstrip */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4">
              <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-300">
                <span>Page Filmstrip</span>
                <span className="font-mono text-slate-500">37 Total</span>
              </div>
              <div className="grid grid-cols-4 gap-2 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
                {REPORT_PAGES.map((page, idx) => (
                  <button
                    key={page.pageNumber}
                    onClick={() => setCurrentPageIndex(idx)}
                    className={`relative rounded-lg overflow-hidden border transition-all ${
                      currentPageIndex === idx
                        ? 'border-amber-500 ring-2 ring-amber-500/30 scale-95'
                        : 'border-slate-800 hover:border-slate-600 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={page.image}
                      alt={`P${page.pageNumber}`}
                      className="w-full h-18 object-cover bg-slate-950"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 text-[10px] font-mono text-center text-slate-300 py-0.5">
                      P.{page.pageNumber}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* GRID VIEW (ALL 37 PAGES) */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredPages.map((page) => {
            const originalIndex = REPORT_PAGES.findIndex(p => p.pageNumber === page.pageNumber);
            return (
              <div
                key={page.pageNumber}
                onClick={() => {
                  setCurrentPageIndex(originalIndex);
                  setViewMode('reader');
                }}
                className="group cursor-pointer bg-slate-900/80 rounded-xl border border-slate-800 hover:border-amber-500/50 p-2 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10 flex flex-col justify-between"
              >
                <div className="relative rounded-lg overflow-hidden bg-slate-950 aspect-[3/4] mb-2 flex items-center justify-center border border-slate-800">
                  <img
                    src={page.image}
                    alt={page.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-[10px] font-mono text-amber-400 font-bold">
                    P.{page.pageNumber}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-mono text-amber-500/80 uppercase truncate">
                    {page.chapter}
                  </div>
                  <div className="text-xs font-semibold text-slate-200 line-clamp-1 group-hover:text-amber-400 transition-colors">
                    {page.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Fullscreen Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col p-4 sm:p-8"
          onClick={() => setIsZoomed(false)}
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-amber-400 font-mono text-sm font-bold">
                Page {currentPage.pageNumber}: {currentPage.title}
              </span>
              <span className="text-slate-500 text-xs ml-3 font-mono">
                Click anywhere or Esc to close
              </span>
            </div>
            <button
              onClick={() => setIsZoomed(false)}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center overflow-auto p-4" onClick={e => e.stopPropagation()}>
            <img
              src={currentPage.image}
              alt={currentPage.title}
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
