export interface PrismaCmdOptionsProps<V = Record<string, string | boolean>> {
  value: Partial<V>
  onChange: (value: Partial<V>) => void
}
