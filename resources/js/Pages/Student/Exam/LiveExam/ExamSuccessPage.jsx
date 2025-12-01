import React, { useRef } from "react";

/**
 * ExamSuccessPage
 * Props: { studentName } provided by Inertia in the server controller
 *
 * How it works:
 * - We render an <svg> with the certificate image as an <image/> element
 * - We add a <path> that defines an arc and place <text><textPath> (student name) on it
 * - You can fine-tune the path/position using the commented lines below
 * - "Download certificate" serializes the SVG -> draws to canvas -> saves as PNG
 */

export default function ExamSuccessPage({ studentName = "Student Name" }) {
  const svgRef = useRef(null);

  // Download function: convert inline SVG to PNG
  const downloadCertificate = async () => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    // Serialize SVG
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgEl);

    // Fix for potential xmlns missing
    if (!svgString.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
      svgString = svgString.replace(
        /^<svg/,
        '<svg xmlns="http://www.w3.org/2000/svg"'
      );
    }
    // add xml declaration
    svgString = '<?xml version="1.0" standalone="no"?>\r\n' + svgString;

    // convert to data URL
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    // draw to canvas
    const img = new Image();
    // Important: ensure same-origin or public path. If your cert image is in public folder it should be fine.
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      // white background (optional)
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      // Re-draw SVG overlay (since serializing full SVG already included the image,
      // we can directly draw the serialized SVG as image — but to be safe we use the same URL)
      // Load the SVG as image and draw it (it already contains the background image so this is fine).
      const svgImg = new Image();
      svgImg.crossOrigin = "anonymous";
      svgImg.onload = () => {
        ctx.drawImage(svgImg, 0, 0);
        URL.revokeObjectURL(url);
        const png = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = png;
        a.download = `${studentName.replace(/\s+/g, "_")}_certificate.png`;
        a.click();
      };
      svgImg.onerror = (e) => {
        console.error("SVG-to-image load failed", e);
        URL.revokeObjectURL(url);
      };
      svgImg.src = url;
    };
    img.onerror = (e) => {
      console.error("Image load failed", e);
      URL.revokeObjectURL(url);
    };

    // to ensure the image used in <svg> is included we set src to the serialized SVG url
    img.src = url;
  };

  // PATH DETAILS: change these to tune the curve and position of the name.
  // Important lines to edit (comments point them out in JSX below).
  // - pathD: the 'd' attribute of the arc path controls radius/shape/position.
  // - textStartOffset: controls where the text starts on the path (use percent or px).
  // - fontSize: controls name size (in px).
  // - x/y/width/height of the SVG if your certificate image has different size.

  // --- Example default values:
  const svgWidth = 1600; // change if your certificate image size is different
  const svgHeight = 1200; // change if your certificate image size is different

  // Path 'd' — this creates an arc. Tweak the numbers to nudge the name.
  // See the comments in SVG for which line to change.
  const pathId = "nameArcPath";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <h2>Exam Completed — Certificate</h2>

      <div style={{ position: "relative", width: svgWidth, maxWidth: "95%" }}>
        {/* The svg contains the certificate image and the curved text */}
        <svg
          ref={svgRef}
          width="100%" // responsive: fills container
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
        >
          {/* Put the certificate image here.
              Change this src if you place the image in another folder.
              The path assumes your image is publicly reachable at:
              /assets/images/certificate/Beige Brown Aesthetic Business Completion Certificate.png
          */}
          <image
            href="/assets/images/certificate/Beige Brown Aesthetic Business Completion Certificate.png"
            x="0"
            y="0"
            width={svgWidth}
            height={svgHeight}
            preserveAspectRatio="xMidYMid slice"
          />

          {/* =========================
              EDIT THESE LINES TO TUNE POSITION & CURVE
              ========================= */}

          {/* 1) Path: change the 'd' to move the arc or change radius/center.
                Example below: an arc centered roughly near (800, 600) with radius-like control.
                - If the name sits too high/low/left/right: change the 'M' and 'A' coordinates.
                - For small tweaks: change the second number in M (x) or first number after A (rx,ry).
          */}
          <defs>
            <path
              id={pathId}
              // ====== CHANGE THIS 'd' TO TUNE POSITION ======
              // Example arc path:
              d="M 400 680 A 480 160 0 0 1 1200 680"
              // --------------------------------------------
              // Explanation:
              // M 400 680   -> move to starting point (x,y)
              // A 480 160 0 0 1 1200 680
              //   480 160 -> radii of the ellipse (rx ry) (controls how curved the arc is)
              //   0 0 1    -> rotation, large-arc-flag, sweep-flag
              //   1200 680 -> end point (x,y)
            />
          </defs>

          {/* 2) Text on the path: tune fontSize and startOffset */}
          <text textAnchor="middle">
            <textPath
              href={`#${pathId}`}
              // ====== CHANGE startOffset TO MOVE TEXT ALONG ARC ======
              // values: "50%" centers along path; change to "45%" or "55%" to nudge.
              startOffset="50%"
              // =======================================================
              // fontSize controls the size of the curved name:
              style={{ fontSize: 48, fontFamily: "serif", fontWeight: 700 }}
              // you can change fontFamily to a script font if you want a cursive look
            >
              {studentName}
            </textPath>
          </text>

          {/* OPTIONAL: small guide points for debugging (COMMENT OUT when not needed)
              <circle cx="400" cy="680" r="5" fill="red" />
              <circle cx="1200" cy="680" r="5" fill="blue" />
          */}
        </svg>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={downloadCertificate}
          style={{
            padding: "10px 14px",
            borderRadius: 6,
            border: "none",
            background: "#2b6cb0",
            color: "white",
            cursor: "pointer",
          }}
        >
          Download certificate (PNG)
        </button>

        <button
          onClick={() => window.print()}
          style={{
            padding: "10px 14px",
            borderRadius: 6,
            border: "1px solid #ccc",
            background: "white",
            cursor: "pointer",
          }}
        >
          Print
        </button>
      </div>

      <p style={{ fontSize: 13, color: "#666", marginTop: 6 }}>
        Tip: to adjust name position, edit the <code>path d</code>, <code>startOffset</code>, or the
        <code>fontSize</code> above. I commented the exact lines in the SVG.
      </p>
    </div>
  );
}
