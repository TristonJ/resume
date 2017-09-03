# Fish git prompt
set __fish_git_prompt_showdirtystate 'yes'
set __fish_git_prompt_showstashstate 'no'
set __fish_git_prompt_showuntrackedfiles 'yes'
set __fish_git_prompt_showupstream 'yes'
set __fish_git_prompt_show_informative_status 'yes'
set __fish_git_prompt_showcolorhints 'yes'

# Git status chars
set __fish_git_prompt_char_dirtystate '*'
set __fish_git_prompt_char_stagedstate '+'
set __fish_git_prompt_char_untrackedfiles '%'
set __fish_git_prompt_char_stashstate ''
set __fish_git_prompt_char_upstream_ahead '+'
set __fish_git_prompt_char_upstream_behind '-'
set __fish_git_prompt_char_upstream_prefix ' '

# Check if git repo
function is_git_repo
  git rev-parse --is-inside-work-tree 2> /dev/null
end

# Get sha for current git commit
function git_sha
  git rev-parse --short HEAD 2>/dev/null
end

# Fish prompt
function fish_prompt
  set last_status $status
  if git rev-parse --git-dir > /dev/null 2>&1
    # It might be cleaner to do a custom git prompt, but for now we will just mess with the default
    printf '[%s %s%s%s]\n' (__fish_git_prompt | sed 's/[()]//gi' | xargs) (set_color purple) (git_sha) (set_color normal)
  end
  if test -z $WINDOW
    printf '%s%s:%s/%s%s> ' (set_color purple) (whoami) (set_color yellow) (basename $PWD) (set_color normal)
  else
    printf '%s%s:%s(%s)%s/%s%s> ' (set_color purple) (whoami) (set_color white) (echo $WINDOW) (set_color yellow) (basename $PWD) (set_color normal)
  end
end

# Colorize json output
function jsonColorize 
  command --search underscore >/dev/null; and begin
    underscore print --color $argv
  end; or begin
    echo $argv
  end
end

# Aliases pulled from .bashrc
alias gh='history | grep -a '
alias json='python -m json.tool | jsonColorize'
alias last-merge='git log (git merge-base --octopus (git log -1 --merges --pretty=format:%P))..(git log -1 --merges --pretty=format:%H) --boundary --graph --pretty=oneline --abbrev-commit --no-merges'
