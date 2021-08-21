export type ExtractFCProps<Type> = Type extends React.FC<infer X> ? X : never;
