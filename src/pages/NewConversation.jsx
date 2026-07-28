import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { waslApi } from '@/api/waslClient';
import { ArrowLeft } from 'lucide-react';
import ProgressIndicator from '@/components/wasl/ProgressIndicator';
import TopicChip from '@/components/wasl/TopicChip';

const topics = ['Screen time', 'Responsibilities', 'Privacy', 'Family time', 'Communication', 'Study expectations', 'Sibling conflict', 'Other'];

export default function NewConversation() {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [saving, setSaving] = useState(false);

  const handleContinue = async () => {
    if (!description.trim()) return;
    setSaving(true);
    try {
      const title = selectedTopic || description.slice(0, 40);
      const code = 'WASL-' + Math.floor(1000 + Math.random() * 9000);
      const convo = await waslApi.entities.Conversation.create({
        title,
        description: description.trim(),
        topic: selectedTopic,
        session_code: code,
        status: 'created',
        current_step: 1,
      });
      navigate(`/conversation/${convo.id}/participants`);
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <button onClick={() => navigate(-1)} className="text-wasl-gray p-1 -ml-1">
          <ArrowLeft size={22} />
        </button>
      </div>

      <div className="px-5 mb-6">
        <ProgressIndicator currentStep={1} />
      </div>

      <div className="px-5 flex-1 flex flex-col max-w-lg mx-auto w-full">
        <h1 className="text-xl font-bold text-wasl-navy leading-snug">
          What would you like to understand better?
        </h1>
        <p className="text-wasl-gray text-sm mt-2 leading-relaxed">
          Describe the situation in one or two sentences. Avoid blaming language or private information.
        </p>

        {/* Text input */}
        <div className="mt-5">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 300))}
            placeholder="Example: We disagree about phone use during family time."
            className="w-full h-32 bg-[#F5FAFE] border border-[#EAF4FC] rounded-2xl p-4 text-wasl-navy text-[15px] leading-relaxed resize-none focus:outline-none focus:border-wasl-primary focus:ring-2 focus:ring-wasl-primary/10 placeholder:text-wasl-gray/50"
          />
          <p className="text-right text-xs text-wasl-gray mt-1.5">{description.length}/300</p>
        </div>

        {/* Topic chips */}
        <div className="mt-5">
          <p className="text-sm font-medium text-wasl-navy mb-3">Suggested topics</p>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <TopicChip
                key={topic}
                label={topic}
                selected={selectedTopic === topic}
                onClick={() => setSelectedTopic(selectedTopic === topic ? '' : topic)}
              />
            ))}
          </div>
        </div>

        <div className="mt-auto py-6">
          <button
            onClick={handleContinue}
            disabled={!description.trim() || saving}
            className="wasl-btn-primary text-base"
          >
            {saving ? 'Creating...' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}