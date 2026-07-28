import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { waslApi } from '@/api/waslClient';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function JoinConversationModal({ open, onOpenChange }) {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [searching, setSearching] = useState(false);
  const [convo, setConvo] = useState(null);

  const handleChange = (e) => {
    const raw = e.target.value;
    const cleaned = raw.replace(/^WASL-?/i, '').replace(/[^A-Z0-9]/gi, '').toUpperCase().slice(0, 4);
    setCode(cleaned);
    setError('');
    if (cleaned.length < 4) setConvo(null);
  };

  const handleJoin = async () => {
    if (code.length < 4) return;
    setSearching(true);
    setError('');
    try {
      const results = await waslApi.entities.Conversation.filter({ session_code: 'WASL-' + code });
      if (results.length > 0) {
        setConvo(results[0]);
      } else {
        setError('No conversation found with this code. Please check and try again.');
      }
    } catch (e) {
      setError('Something went wrong. Please try again.');
    }
    setSearching(false);
  };

  const reset = () => {
    setCode('');
    setError('');
    setConvo(null);
    setSearching(false);
  };

  const handleClose = (open) => {
    onOpenChange(open);
    if (!open) setTimeout(reset, 200);
  };

  const handleConfirmJoin = () => {
    handleClose(false);
    navigate(`/conversation/${convo.id}/perspective/b`);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md rounded-[24px] p-0 overflow-hidden gap-0">
        <div className="px-5 pt-5 pb-2">
          <h2 className="text-lg font-bold text-wasl-navy">Join a conversation</h2>
        </div>

        <div className="px-5 pb-6">
          {!convo ? (
            <>
              <p className="text-sm text-wasl-gray leading-relaxed mb-5">
                Enter the code shared with you by a family member.
              </p>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-wasl-navy font-semibold tracking-wider text-lg">
                  WASL-
                </span>
                <input
                  value={code}
                  onChange={handleChange}
                  placeholder="____"
                  maxLength={4}
                  autoCapitalize="characters"
                  autoCorrect="off"
                  autoComplete="off"
                  spellCheck={false}
                  className="w-full h-14 pl-20 pr-4 bg-[#F5FAFE] border-2 border-[#EAF4FC] rounded-2xl text-wasl-navy text-lg font-semibold tracking-[0.3em] uppercase focus:outline-none focus:border-wasl-primary placeholder:text-wasl-gray/40"
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 mt-3">{error}</p>
              )}

              <button
                onClick={handleJoin}
                disabled={code.length < 4 || searching}
                className="wasl-btn-primary text-base mt-5 flex items-center justify-center gap-2"
              >
                {searching ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    Join conversation
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <p className="text-xs text-wasl-gray text-center mt-4 leading-relaxed">
                Your perspective will remain private until both participants submit.
              </p>
            </>
          ) : (
            <div className="mt-2">
              <div className="bg-[#F5FAFE] rounded-[20px] border border-[#EAF4FC] p-5">
                <h3 className="text-lg font-bold text-wasl-navy leading-tight">{convo.title}</h3>
                <div className="mt-3 space-y-1.5">
                  <p className="text-sm text-wasl-gray">
                    Created by: <span className="text-wasl-navy font-medium">{convo.participant_a_role || 'Family member'}</span>
                  </p>
                  <p className="text-sm text-wasl-gray">
                    You are joining as: <span className="text-wasl-navy font-medium">{convo.participant_b_role || 'Participant'}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={handleConfirmJoin}
                className="wasl-btn-primary text-base mt-5 flex items-center justify-center gap-2"
              >
                Join and share my perspective
                <ArrowRight size={18} />
              </button>

              <p className="text-xs text-wasl-gray text-center mt-4 leading-relaxed">
                Your perspective will remain private until both participants submit.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}