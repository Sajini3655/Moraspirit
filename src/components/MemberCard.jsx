export default function MemberCard({ member, selected, onSelect }) {
  return (
    <div
      className={`card ${selected ? "selected" : ""}`}
      onClick={() => onSelect(member)}
    >
      <div className="card-header">
        <span className="dot"></span>
      </div>

      <p className="member-name">{member.name}</p>
      <p className="member-role">{member.role}</p>
    </div>
  );
}