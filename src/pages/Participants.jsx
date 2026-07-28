import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { waslApi } from '@/api/waslClient';
import { ArrowLeft, Shield } from 'lucide-react';
import ProgressIndicator from '@/components/wasl/ProgressIndicator';

const roles = ['Parent', 'Teenager', 'Sibling', 'Grandparent', 'Guardian', 'Other family member'];

export default function Participants() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [roleA, setRoleA] = useState('');
  const [nameA, setNameA] = useState('');
  const [roleB, setRoleB] = useState('');
  const [nameB, setNameB] = useState('');
  const [saving, setSaving] = useState(false);

  const handleCreate = async () => {
    if (!roleA || !roleB) return;
    setSaving(true);
    try {
      await waslApi.entities.Conversation.update(id, {
        participant_a_role: roleA,
        participant_a_name: nameA || 'Participant A',
        participant_b_role: roleB,
        participant_b_name: nameB || 'Participant B',
      });
      navigate(`/conversation/${id}/session`);
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="px-5 pt-5 pb-3">
        <button onClick={() => navigate(-1)} className="text-wasl-gray p-1 -ml-1">
          <ArrowLeft size={22} />
        </button>
      </div>

      <div className="px-5 mb-6">
        <ProgressIndicator currentStep={1} />
      </div>

      <div className="px-5 flex-1 flex flex-col max-w-lg mx-auto w-full">
        <h1 className="text-xl font-bold text-wasl-navy">Who is part of this conversation?</h1>

        {/* Participant A */}
        <div className="wasl-card mt-5">
          <p className="text-sm font-semibold text-wasl-primary mb-3">Participant A</p>
          <select
            value={roleA}
            onChange={(e) => setRoleA(e.target.value)}
            className="w-full bg-[#F5FAFE] border border-[#EAF4FC] rounded-xl p-3.5 text-wasl-navy text-sm focus:outline-none focus:border-wasl-primary appearance-none"
          >
            <option value="">Select role...</option>
            {roles.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          <input
            value={nameA}
            onChange={(e) => setNameA(e.target.value)}
            placeholder="Nickname (optional)"
            className="w-full bg-[#F5FAFE] border border-[#EAF4FC] rounded-xl p-3.5 text-wasl-navy text-sm mt-3 focus:outline-none focus:border-wasl-primary placeholder:text-wasl-gray/50"
          />
        </div>

        {/* Participant B */}
        <div className="wasl-card mt-4">
          <p className="text-sm font-semibold text-wasl-primary mb-3">Participant B</p>
          <select
            value={roleB}
            onChange={(e) => setRoleB(e.target.value)}
            className="w-full bg-[#F5FAFE] border border-[#EAF4FC] rounded-xl p-3.5 text-wasl-navy text-sm focus:outline-none focus:border-wasl-primary appearance-none"
          >
            <option value="">Select role...</option>
            {roles.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          <input
            value={nameB}
            onChange={(e) => setNameB(e.target.value)}
            placeholder="Nickname (optional)"
            className="w-full bg-[#F5FAFE] border border-[#EAF4FC] rounded-xl p-3.5 text-wasl-navy text-sm mt-3 focus:outline-none focus:border-wasl-primary placeholder:text-wasl-gray/50"
          />
        </div>

        {/* Privacy note */}
        <div className="flex items-center gap-2 mt-4 px-1">
          <Shield size={14} className="text-wasl-gray flex-shrink-0" />
          <p className="text-xs text-wasl-gray">Nicknames are recommended. Full legal names are not needed.</p>
        </div>

        <div className="mt-auto py-6">
          <button
            onClick={handleCreate}
            disabled={!roleA || !roleB || saving}
            className="wasl-btn-primary text-base"
          >
            {saving ? 'Creating...' : 'Create conversation'}
          </button>
        </div>
      </div>
    </div>
  );
}