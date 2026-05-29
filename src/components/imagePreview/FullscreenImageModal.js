// ---------------------------------------------------------------------------
// FullscreenImageModal (v1.5.12)
//
// In-app fullscreen image popup used by report views that previously
// called `window.open(url, '_blank', 'width=800,height=600')` to view a
// preview image at full size. Replacing that pattern keeps the user
// inside the app (no new browser window) and lets the image render at
// the full viewport size centred on a dark backdrop.
//
// Usage:
//   const [fullImg, setFullImg] = useState(null);
//   ...
//   onClick={() => setFullImg(url)}
//   ...
//   <FullscreenImageModal src={fullImg} onClose={() => setFullImg(null)} />
// ---------------------------------------------------------------------------

import React from "react";
import { Modal } from "antd";
import "./FullscreenImageModal.scss";

const FullscreenImageModal = ({ src, onClose, alt = "" }) => (
  <Modal
    visible={!!src}
    onCancel={onClose}
    footer={null}
    centered
    closable
    maskClosable
    destroyOnClose
    className="fullscreen-image-modal"
    width="100vw"
    style={{ top: 0, maxWidth: "100vw", margin: 0, paddingBottom: 0 }}
    bodyStyle={{
      padding: 0,
      background: "transparent",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
    wrapClassName="fullscreen-image-modal-wrap"
  >
    {src && (
      <img
        src={src}
        alt={alt}
        className="fullscreen-image-modal__img"
        onClick={onClose}
      />
    )}
  </Modal>
);

export default FullscreenImageModal;
