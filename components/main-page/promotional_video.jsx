import React from 'react';

export function PromotionalVideo({ video }) {
  return (
    <section className="py-10">
      <div className="flex items-center justify-center">
        <video
          className="rounded-2xl p-4 shadow-md w-[69.562rem] h-auto md:h-[40rem] "
          width="100%"
          height="100%"
          src={video.url}
          title="Vídeo de apresentação"
          controls
        />
      </div>
    </section>
  );
}
