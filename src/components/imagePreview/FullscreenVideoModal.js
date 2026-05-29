// ---------------------------------------------------------------------------
// FullscreenVideoModal (v1.5.16)
//
// In-app fullscreen video popup used by report views that previously called
// `window.open(url, '_blank', 'width=800,height=600')` to play a clip in a
// separate browser window. Mirrors FullscreenImageModal so image and video
// previews behave the same: the media renders at 90% of a near-fullscreen
// popup on a dark backdrop, keeping the user inside the app.
//
// IMPORTANT: the stream API (DMT_API_STREAM_NVR / apistream.py) returns the
// clip as an MJPEG stream — `multipart/x-mixed-replace; boundary=frame`,
// i.e. a sequence of JPEG frames. An HTML <video> element CANNOT play that
// content type; browsers render multipart/x-mixed-replace natively inside an
// <img>. So the player here is an <img>, not a <video>. The server caps the
// stream length (DURATION_SECONDS), and closing the modal (destroyOnClose)
// unmounts the img which tears down the streaming connection.
//
// Usage:
//   const [fullVdo, setFullVdo] = useState(null);
//   ...
//   onClick={() => setFullVdo(url)}
//   ...
//   <FullscreenVideoModal src={fullVdo} onClose={() => setFullVdo(null)} />
// ---------------------------------------------------------------------------

import React from "react";
import { Modal } from "antd";
import "./FullscreenVideoModal.scss";

const FullscreenVideoModal = ({ src, onClose }) => (
  <Modal
    visible={!!src}
    onCancel={onClose}
    footer={null}
    centered
    closable
    maskClosable
    destroyOnClose
    className="fullscreen-video-modal"
    width="96vw"
    bodyStyle={{
      padding: 0,
      background: "transparent",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "calc(100vh - 80px)",
    }}
    wrapClassName="fullscreen-video-modal-wrap"
  >
    {src && (
      <img
        src={src}
        alt="video preview"
        className="fullscreen-video-modal__video"
      />
    )}
  </Modal>
);

export default FullscreenVideoModal;
