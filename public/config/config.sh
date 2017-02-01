HOST="https://www.tristonjones.com/config/"
BASH=$HOST"bashExtras";
CONFIG=$HOST"config.fish";
TMUX=$HOST"tmux.conf";

# Install fish shell, tmux, git, and xclip
sudo apt-add-repository ppa:fish-shell/release-2;
sudo apt-get update && sudo apt-get install fish tmux git xclip;
chsh -s /usr/bin/fish;

# Create the fish config directory if it does not exist
if [ ! -d $HOME/.config/fish ]; then
   mkdir -p $HOME/.config/fish;
fi

# Install my bash extras
curl -o bashExtras $BASH;
cat bashExtras >> $HOME/.bashrc;
rm bashExtras;

# Get my fish config and tmux config
curl -o $HOME/.config/fish/config.fish $CONFIG;
curl -o $HOME/.tmux.conf $TMUX;

# Use fish for every new bash window
echo 'exec fish' >> ~/.bashrc;
