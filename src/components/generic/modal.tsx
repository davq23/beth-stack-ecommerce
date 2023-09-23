import * as elements from "typed-html";

interface ModalProps {
  id: string;
  bodyId: string;
  title: string|undefined;
  _: string|undefined;
}

export const Modal = ({id, title, bodyId, _}:  ModalProps, children: elements.Children) => (
  <div class="modal fade" id={id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" _={_}>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" safe>{title ?? 'Modal'}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id={bodyId}>
        {children}
      </div>
    </div>
  </div>
  </div>
);