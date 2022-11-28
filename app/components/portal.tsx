import type { PropsWithChildren, FC } from "react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

type PortalProps = PropsWithChildren<{ wrapperId: string }>;

const createWrapper = (id: string) => {
	const wrapper = document.createElement("div");
	wrapper.setAttribute("id", id);
	document.body.appendChild(wrapper);
	return wrapper;
};

export const Portal: FC<PortalProps> = ({ children, wrapperId }) => {
	const [wrapper, setWrapper] = useState<HTMLDivElement>();

	useEffect(() => {
		let element = document.getElementById(wrapperId) as HTMLDivElement;
		let created = false;

		if (!element) {
			created = true;
			element = createWrapper(wrapperId);
		}

		setWrapper(element);

		return () => {
			if (created && element?.parentNode) {
				element.parentNode.removeChild(element);
			}
		};
	}, [wrapperId]);

	// if (wrapper === null) return null
	// return createPortal(children, wrapper)
	return wrapper == null ? null : createPortal(children, wrapper);
};
