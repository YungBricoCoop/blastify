const MultiDisplayItem = ({
  id,
  name,
  duration,
  stream = "",
  type,
  onListItemClick,
}) => {
  return (
    <tr
      className="hover:bg-white/10 hover:cursor-pointer"
      onClick={() => onListItemClick({ id, name, duration, type })}
    >
      <td className="p-1">{name}</td>
      <td className="p-1 pr-10 text-right">{duration}</td>
    </tr>
  );
};

export default MultiDisplayItem;
