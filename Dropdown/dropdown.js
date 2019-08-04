async function toggle(caller) {

                var dropdown = caller;
                var labels = dropdown.getElementsByTagName('label');

                await sleep(250);

                if (!dropdown.classList.contains('extended')) {

                    for (var i = 0; i < labels.length; i++) {

                        labels[i].style.display = "block";

                    }

                    dropdown.classList.add('extended');

                } else {

                    for (var i = 0; i < labels.length; i++) {

                        var id = labels[i].getAttribute('for');

                        if (!document.getElementById(id).checked) {

                            labels[i].style.display = "none";

                        }

                    }

                    dropdown.classList.remove('extended');

                }

            }

            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
