import { createElement, type ComponentType } from "react";
import * as runtime from "react/jsx-runtime";

type MDXComponents = Record<string, ComponentType<Record<string, unknown>>>;
type CompiledMDXComponent = ComponentType<{
  components?: MDXComponents;
}>;

const componentCache = new Map<string, CompiledMDXComponent>();

interface MDXContentProps {
  code: string;
  components?: MDXComponents;
}

function getMDXComponent(code: string) {
  const cachedComponent = componentCache.get(code);
  if (cachedComponent) return cachedComponent;

  const factory = new Function(code);
  const Component = factory({ ...runtime }).default as CompiledMDXComponent;
  componentCache.set(code, Component);

  return Component;
}

export function MDXContent({ code, components }: MDXContentProps) {
  return createElement(getMDXComponent(code), { components });
}
